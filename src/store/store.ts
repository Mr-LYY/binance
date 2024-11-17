import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// Relative paths
import themeReducer from './themeSlice';
import paginationReducer from './paginationSlice';
import notificationReducer from './notificationSlice';
import filterReducer from './filterSlice';
import { binanceApi } from '../api/binanceApiSlice';
import webSocketReducer from './webSocketSlice';
import webSocketMiddleware from '../middleware/webSocketMiddleware';
import { SliceNames } from '../types';
import { PERSIST_CONFIG_KEY } from '../utils';

const rootReducer = combineReducers({
  theme: themeReducer,
  filter: filterReducer,
  pagination: paginationReducer,
  notification: notificationReducer,
  [binanceApi.reducerPath]: binanceApi.reducer,
  webSocket: webSocketReducer,
});

const persistConfig = {
  key: PERSIST_CONFIG_KEY,
  storage,
  whitelist: [SliceNames.THEME, SliceNames.PAGINATION, SliceNames.FILTER],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(binanceApi.middleware, webSocketMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
