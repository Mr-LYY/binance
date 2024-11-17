import { FC } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

import { ThemeToggle } from './ThemeToggle';

export const Header: FC = () => {
  return (
    <AppBar
      sx={{
        borderRadius: 1,
      }}
      position="static"
    >
      <Toolbar>
        <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
          <Typography variant="h6">Dmitrii Liulekin Tracker</Typography>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
