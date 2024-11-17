import { useEffect, useRef } from 'react';

// Relative paths
import { WS_ACTION_TYPES } from '../types';
import { areArraysEqual, SYMBOLS_PER_PAGE, WS_DEBOUNCE_DELAY } from '../utils';
import { useAppDispatch, useAppSelector } from './rtk';
import { useGetSymbolsQuery } from '../api/binanceApiSlice';
import { setNotification } from '../store/notificationSlice';
import { useDebounce } from './useDebounce';

export const useWebsocketControl = () => {
  const dispatch = useAppDispatch();
  const isFirstRender = useRef(true);
  const previousSymbols = useRef<string[]>([]);

  const filter = useAppSelector((state) => state.filter.filter);
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const { data: symbolsData, error, isLoading } = useGetSymbolsQuery();

  const filteredSymbols = symbolsData?.symbols
    ? symbolsData.symbols.filter((symbol) => symbol.symbol.toLowerCase().includes(filter.toLowerCase()))
    : [];

  const pageSymbols = filteredSymbols.slice(
    currentPage * SYMBOLS_PER_PAGE,
    currentPage * SYMBOLS_PER_PAGE + SYMBOLS_PER_PAGE,
  );

  const debouncedUpdate = useDebounce(() => {
    const currentSymbols = pageSymbols.map((s) => s.symbol.toLowerCase());
    const doPrevSymbolsExist = !!previousSymbols.current.length;

    if (currentSymbols.length === 0 && doPrevSymbolsExist) {
      dispatch({ type: WS_ACTION_TYPES.DISCONNECT, payload: previousSymbols.current });
      previousSymbols.current = [];

      return;
    }

    if (!areArraysEqual(previousSymbols.current, currentSymbols)) {
      if (doPrevSymbolsExist) {
        dispatch({ type: WS_ACTION_TYPES.DISCONNECT, payload: previousSymbols.current });
      }

      dispatch({ type: WS_ACTION_TYPES.CONNECT, payload: currentSymbols });
      previousSymbols.current = currentSymbols;
    }
  }, WS_DEBOUNCE_DELAY);

  useEffect(() => {
    const currentSymbols = pageSymbols.map((s) => s.symbol.toLowerCase());

    if (isFirstRender.current && currentSymbols.length > 0) {
      dispatch({ type: WS_ACTION_TYPES.CONNECT, payload: currentSymbols });
      previousSymbols.current = currentSymbols;
      isFirstRender.current = false;
    } else {
      debouncedUpdate();
    }
  }, [pageSymbols, dispatch, debouncedUpdate]);

  useEffect(() => {
    if (error) {
      dispatch(setNotification('Failed to load symbol data. Please try again later.'));
    }
  }, [error]);

  return { error, isLoading, symbolsData, pageSymbols, filteredSymbols };
};
