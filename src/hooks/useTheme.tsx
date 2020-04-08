import * as React from 'react';
import {
  ThemeProvider as StyledComponentsThemeProvider,
  ThemeContext,
} from 'styled-components';

import { theme, Theme } from '../ui/theme';

interface Props {
  children?: React.ReactNode;
}

export const ThemeProvider = ({ children }: Props) => (
  <StyledComponentsThemeProvider theme={theme}>
    {children}
  </StyledComponentsThemeProvider>
);

export const useTheme = () => {
  const theme = React.useContext<Theme>(ThemeContext);

  return theme;
};
