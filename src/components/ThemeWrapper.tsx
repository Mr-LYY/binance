import { FC, ReactNode } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { useAppSelector } from '../hooks';
import { darkTheme, lightTheme } from '../theme';

interface IThemeWrapperProps {
  children: ReactNode;
}

export const ThemeWrapper: FC<IThemeWrapperProps> = ({ children }) => {
  const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
