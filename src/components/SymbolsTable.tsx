import { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  Typography,
} from '@mui/material';
import { IBinanceSymbol } from '../types';
import { NO_PRICE_PLACEHOLDER } from '../utils';

interface SymbolsTableProps {
  symbols: IBinanceSymbol[];
  prices: Record<string, { bid: string; ask: string }>;
  onSymbolClick: (symbol: string) => void;
  isLoading: boolean;
}

export const SymbolsTable: FC<SymbolsTableProps> = ({ symbols, prices, onSymbolClick, isLoading }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ width: '25%' }}>
            <Typography color="primary">Symbol</Typography>
          </TableCell>
          <TableCell sx={{ width: '25%' }}>
            <Typography color="primary">Bid</Typography>
          </TableCell>
          <TableCell sx={{ width: '25%' }}>
            <Typography color="primary">Ask</Typography>
          </TableCell>
          <TableCell sx={{ width: '25%' }}>
            <Typography color="primary">Spread</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {isLoading
          ? [...Array(10)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
              </TableRow>
            ))
          : symbols.map((symbol) => {
              const priceData = prices[symbol.symbol];
              const spread =
                priceData && priceData.bid && priceData.ask
                  ? (parseFloat(priceData.ask) - parseFloat(priceData.bid)).toFixed(6)
                  : NO_PRICE_PLACEHOLDER;

              return (
                <TableRow
                  hover
                  key={symbol.symbol}
                  onClick={() => onSymbolClick(symbol.symbol)}
                  sx={{
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                  }}
                >
                  <TableCell style={{ width: '25%' }}>{symbol.symbol}</TableCell>
                  <TableCell style={{ width: '25%' }}>{priceData?.bid || NO_PRICE_PLACEHOLDER}</TableCell>
                  <TableCell style={{ width: '25%' }}>{priceData?.ask || NO_PRICE_PLACEHOLDER}</TableCell>
                  <TableCell style={{ width: '25%' }}>{spread}</TableCell>
                </TableRow>
              );
            })}
      </TableBody>
    </Table>
  </TableContainer>
);
