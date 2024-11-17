import { FC } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box, Chip } from '@mui/material';

import { IBinanceSymbol } from '../types';

interface ISymbolDetailsDialogProps {
  symbol: IBinanceSymbol | null;
  onClose: () => void;
}

export const SymbolDetailsDialog: FC<ISymbolDetailsDialogProps> = ({ symbol, onClose }) => (
  <Dialog open={!!symbol} onClose={onClose}>
    <DialogTitle>Symbol Details</DialogTitle>
    <DialogContent>
      {symbol ? (
        <Box gap={2} display="flex" flexDirection="column">
          <Box display="flex" gap={1} alignItems="center">
            <Typography>
              <strong>Symbol:</strong>
            </Typography>{' '}
            <Chip label={symbol.symbol} />
          </Box>
          <Box>
            <Typography>
              <strong>Order Types:</strong>
            </Typography>{' '}
            {symbol?.orderTypes?.length ? (
              symbol.orderTypes.map((type) => (
                <Chip sx={{ margin: '2px' }} key={type} variant="outlined" label={type} />
              ))
            ) : (
              <Typography>No order types available</Typography>
            )}
          </Box>
          <Box display="flex" gap={1} alignItems="center">
            <Typography>
              <strong>Status:</strong>
            </Typography>{' '}
            <Chip variant="outlined" label={symbol.status} />
          </Box>
        </Box>
      ) : (
        <Typography>No details available.</Typography>
      )}
    </DialogContent>
  </Dialog>
);
