import { FC } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

interface IFilterBarProps {
  filter: string;
  onFilterChange: (value: string) => void;
  onClearFilter: () => void;
}

export const FilterBar: FC<IFilterBarProps> = (props) => {
  const { filter, onFilterChange, onClearFilter } = props;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <TextField
        label="Filter Symbols"
        variant="outlined"
        fullWidth
        margin="none"
        size="small"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
      />
      <Button
        size="small"
        variant="outlined"
        sx={{
          height: 40,
          paddingX: 4,
          display: 'flex',
          alignItems: 'center',
          textTransform: 'none',
          whiteSpace: 'nowrap',
        }}
        onClick={onClearFilter}
        disabled={!filter}
      >
        <Typography>Clear all</Typography>
      </Button>
    </Box>
  );
};
