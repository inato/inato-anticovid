import * as React from "react";
import {
  ThemeProvider as StyledComponentsThemeProvider,
  ThemeContext
} from "styled-components";

import { theme, Theme, GlobalStyle } from "../ui/theme";

interface Props {
  children?: React.ReactNode;
}

/**
As of `styled-component@4.0.0-beta.10`, using <GlobalStyle/> in `ThemeProvided`
introduces the following warning in styleguidist:

> The global style component sc-global-3328377047 was composed and rendered multiple times in your React component tree.
> Only the last-rendered copy will have its styles remain in <head> (or your StyleSheetManager target.)

because styleguidist renders a full <ThemWrapper/> for each component example generated.

This does not cause any issue in our apps and can be ignored (or fixed in later versions).
 */
export const ThemeProvider = ({ children }: Props) => (
  <StyledComponentsThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      {children}
    </>
  </StyledComponentsThemeProvider>
);

export const useTheme = () => {
  const theme = React.useContext<Theme>(ThemeContext);

  return theme;
};
