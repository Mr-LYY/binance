import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_REDUCER_PATHS, IBinanceExchangeInfo } from '../types';
import { API_DATA } from '../utils';

export const binanceApi = createApi({
  reducerPath: API_REDUCER_PATHS.BINANCE,
  baseQuery: fetchBaseQuery({ baseUrl: API_DATA[API_REDUCER_PATHS.BINANCE].BASE_URL }),
  endpoints: ({ query }) => ({
    getSymbols: query<IBinanceExchangeInfo, void>({
      query: () => API_DATA[API_REDUCER_PATHS.BINANCE].EXCHANGE_INFO_QUERY,
    }),
  }),
});

export const { useGetSymbolsQuery } = binanceApi;
