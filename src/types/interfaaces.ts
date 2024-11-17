import { ORDER_TYPES, SYMBOL_STATUSES } from './enums';

export interface IUpdatePricePayload {
  symbol: string;
  bid: string;
  ask: string;
}

interface IRateLimit {
  rateLimitType: string;
  interval: string;
  intervalNum: number;
  limit: number;
}

interface IFilter {
  filterType: string;
  [key: string]: unknown;
}

export interface IBinanceSymbol {
  symbol: string;
  status: SYMBOL_STATUSES;
  baseAsset: string;
  baseAssetPrecision: number;
  quoteAsset: string;
  quotePrecision: number;
  quoteAssetPrecision: number;
  baseCommissionPrecision: number;
  quoteCommissionPrecision: number;
  orderTypes: ORDER_TYPES[];
  icebergAllowed: boolean;
  ocoAllowed: boolean;
  quoteOrderQtyMarketAllowed: boolean;
  isSpotTradingAllowed: boolean;
  isMarginTradingAllowed: boolean;
  filters: IFilter[];
  permissions: string[];
}

export interface IBinanceExchangeInfo {
  timezone: string;
  serverTime: number;
  rateLimits: IRateLimit[];
  exchangeFilters: IFilter[];
  symbols: IBinanceSymbol[];
}
