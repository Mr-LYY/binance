import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

// Relative paths
import { updatePrice } from '../store/webSocketSlice';
import { WS_ACTION_TYPES, WS_METHODS } from '../types';
import { createDebouncer, WS_DEBOUNCE_DELAY, WS_RECONNECT_DELAY, WS_URL } from '../utils';

let socket: WebSocket | null = null;
let isSocketOpen = false;
let pendingSubscriptions: string[] = [];

const sendSubscriptions = () => {
  if (socket && isSocketOpen && pendingSubscriptions.length > 0) {
    socket.send(
      JSON.stringify({
        method: WS_METHODS.SUBSCRIBE,
        params: pendingSubscriptions.map((symbol) => `${symbol}@ticker`),
        id: 1,
      }),
    );
    pendingSubscriptions = [];
  }
};

const debounceSubscriptions = createDebouncer(
  (symbols: string[], storeAPI: MiddlewareAPI<Dispatch<AnyAction>, any>) => {
    pendingSubscriptions = [...new Set([...pendingSubscriptions, ...symbols])];

    if (isSocketOpen) {
      sendSubscriptions();
    } else if (!socket || socket.readyState === WebSocket.CLOSED) {
      storeAPI.dispatch({ type: WS_ACTION_TYPES.CONNECT, payload: pendingSubscriptions });
    }
  },
  WS_DEBOUNCE_DELAY,
);

const reconnectWebSocket = createDebouncer((storeAPI: MiddlewareAPI<Dispatch<AnyAction>, any>) => {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    console.log('Attempting to reconnect WebSocket...');
    storeAPI.dispatch({ type: WS_ACTION_TYPES.CONNECT, payload: pendingSubscriptions });
  }
}, WS_RECONNECT_DELAY);

const webSocketMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  switch (action.type) {
    case WS_ACTION_TYPES.CONNECT: {
      const visibleSymbols = action.payload;

      if (!socket || socket.readyState === WebSocket.CLOSING || socket.readyState === WebSocket.CLOSED) {
        socket = new WebSocket(WS_URL);
        isSocketOpen = false;

        socket.onopen = () => {
          console.log('WebSocket connected');
          isSocketOpen = true;
          sendSubscriptions();
        };

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);

            if (data.s && data.b && data.a) {
              storeAPI.dispatch(
                updatePrice({
                  symbol: data.s,
                  bid: data.b,
                  ask: data.a,
                }),
              );
            } else {
              console.warn('Unexpected message format:', data);
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error, event.data);
          }
        };

        socket.onclose = () => {
          console.log('WebSocket disconnected');
          isSocketOpen = false;
          reconnectWebSocket(storeAPI);
        };

        socket.onerror = (error) => {
          console.error('WebSocket error:', error);
          reconnectWebSocket(storeAPI);
        };
      }

      debounceSubscriptions(visibleSymbols, storeAPI);

      break;
    }

    case WS_ACTION_TYPES.DISCONNECT: {
      const symbolsToUnsubscribe = action.payload;

      if (socket && isSocketOpen && socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            method: WS_METHODS.UNSUBSCRIBE,
            params: symbolsToUnsubscribe.map((symbol: string) => `${symbol}@ticker`),
            id: 1,
          }),
        );
      }

      break;
    }

    default:
      break;
  }

  return next(action);
};

export default webSocketMiddleware;
