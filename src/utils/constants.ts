import { API_REDUCER_PATHS } from '../types';

export const PERSIST_CONFIG_KEY = 'root';
export const WS_URL = 'wss://stream.binance.com:9443/ws';
export const WS_DEBOUNCE_DELAY = 500;
export const WS_RECONNECT_DELAY = 2000;
export const API_DATA = {
  [API_REDUCER_PATHS.BINANCE]: {
    BASE_URL: 'https://api.binance.com/api/v3/',
    EXCHANGE_INFO_QUERY: 'exchangeInfo',
  },
};
export const INITIAL_PAGE_NUMBER = 0;
export const SYMBOLS_PER_PAGE = 10;
export const NOTIFICATION_AUTO_HIDE_DURATION = 6000;
export const NO_PRICE_PLACEHOLDER = '-';
export const DARK_OPACITY = 0.3;
export const FULL_OPACITY = 1;
