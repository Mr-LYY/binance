import { FC } from 'react';
import { Switch, Box } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { toggleTheme } from '../store/themeSlice';
import { DARK_OPACITY, FULL_OPACITY } from '../utils';
import { useAppDispatch, useAppSelector } from '../hooks';

export const ThemeToggle: FC = () => {
  const dispatch = useAppDispatch();
  const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <LightModeIcon opacity={isDarkTheme ? DARK_OPACITY : FULL_OPACITY} />
      <Switch
        checked={isDarkTheme}
        onChange={handleToggle}
        color="primary"
        inputProps={{ 'aria-label': 'Theme toggle' }}
      />
      <DarkModeIcon opacity={!isDarkTheme ? DARK_OPACITY : FULL_OPACITY} color={isDarkTheme ? 'primary' : 'inherit'} />
    </Box>
  );
};
