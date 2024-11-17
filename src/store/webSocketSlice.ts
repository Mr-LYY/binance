import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SliceNames, IUpdatePricePayload } from '../types';

interface PriceData {
  bid: string;
  ask: string;
}

interface WebSocketState {
  prices: Record<string, PriceData>;
}

const initialState: WebSocketState = {
  prices: {},
};

const webSocketSlice = createSlice({
  name: SliceNames.WEBSOCKET,
  initialState,
  reducers: {
    updatePrice: (state, action: PayloadAction<IUpdatePricePayload>) => {
      state.prices[action.payload.symbol] = {
        bid: action.payload.bid,
        ask: action.payload.ask,
      };
    },
  },
});

export const { updatePrice } = webSocketSlice.actions;

export default webSocketSlice.reducer;
