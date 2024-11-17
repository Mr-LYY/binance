import { FC, useState, MouseEvent } from 'react';
import { Box, Typography } from '@mui/material';

// Relative paths
import { IBinanceSymbol } from '../types';
import { SYMBOLS_PER_PAGE } from '../utils';
import { setPage } from '../store/paginationSlice';
import { setFilter, clearFilter } from '../store/filterSlice';
import { useAppDispatch, useAppSelector, useWebsocketControl } from '../hooks';
import { Header, Pagination, SymbolsTable, FilterBar, NotificationSnackbar, SymbolDetailsDialog } from './index';

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const prices = useAppSelector((state) => state.webSocket.prices);
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const filter = useAppSelector((state) => state.filter.filter);
  const [selectedSymbol, setSelectedSymbol] = useState<IBinanceSymbol | null>(null);

  const { error, isLoading, pageSymbols, symbolsData, filteredSymbols } = useWebsocketControl();

  const handlePageChange = (_: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleFilterChange = (value: string) => {
    dispatch(setFilter(value));
    dispatch(setPage(0));
  };

  const handleClearFilter = () => {
    dispatch(clearFilter());
    dispatch(setPage(0));
  };

  const handleSymbolClick = (symbol: string) => {
    const symbolDetails = symbolsData?.symbols.find((item) => item.symbol === symbol);
    setSelectedSymbol(symbolDetails || null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Header />
      <FilterBar filter={filter} onFilterChange={handleFilterChange} onClearFilter={handleClearFilter} />
      {error ? (
        <Typography>Error loading symbols</Typography>
      ) : (
        <>
          <SymbolsTable
            symbols={pageSymbols}
            prices={prices}
            onSymbolClick={(symbol) => handleSymbolClick(symbol)}
            isLoading={isLoading}
          />
          <Pagination
            count={filteredSymbols.length}
            page={currentPage}
            rowsPerPage={SYMBOLS_PER_PAGE}
            onPageChange={handlePageChange}
          />
          <NotificationSnackbar />
        </>
      )}
      <SymbolDetailsDialog symbol={selectedSymbol} onClose={() => setSelectedSymbol(null)} />
    </Box>
  );
};
