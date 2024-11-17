export enum SYMBOL_STATUSES {
  PRE_TRADING = 'PRE_TRADING',
  TRADING = 'TRADING',
  POST_TRADING = 'POST_TRADING',
  END_OF_DAY = 'END_OF_DAY',
  HALT = 'HALT',
  AUCTION_MATCH = 'AUCTION_MATCH',
  BREAK = 'BREAK',
}

export enum ORDER_TYPES {
  LIMIT = 'LIMIT',
  MARKET = 'MARKET',
  STOP_LOSS = 'STOP_LOSS',
  STOP_LOSS_LIMIT = 'STOP_LOSS_LIMIT',
  TAKE_PROFIT = 'TAKE_PROFIT',
  TAKE_PROFIT_LIMIT = 'TAKE_PROFIT_LIMIT',
  LIMIT_MAKER = 'LIMIT_MAKER',
}

export enum SliceNames {
  THEME = 'theme',
  PAGINATION = 'pagination',
  FILTER = 'filter',
  WEBSOCKET = 'webSocket',
}

export enum API_REDUCER_PATHS {
  BINANCE = 'binanceApi',
}

export enum WS_METHODS {
  SUBSCRIBE = 'SUBSCRIBE',
  UNSUBSCRIBE = 'UNSUBSCRIBE',
}

export enum WS_ACTION_TYPES {
  CONNECT = 'webSocket/connect',
  DISCONNECT = 'webSocket/disconnect',
}
