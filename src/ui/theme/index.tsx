import { createGlobalStyle } from "styled-components";

import { borderRadiuses } from "./border";
import { colors, semanticColors } from "./color";
import { fontFamilies, fontSizes, lineHeights, fontWeights } from "./font";
import { getVariation } from "./helpers";
import { breakpoints, widths } from "./layout";
import { shadows } from "./shadow";
import { spacings } from "./spacing";
import { zIndexes } from "./zindex";

export * from "./color";

export const theme = {
  borderRadiuses,
  breakpoints,
  colors,
  fontFamilies,
  fontSizes,
  fontWeights,
  getVariation,
  lineHeights,
  semanticColors,
  shadows,
  spacings,
  widths,
  zIndexes
};

export const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
  }

  * {
    @media print {
      font-family: ${theme.fontFamilies.print};
    }
  }

  body {
    font-family: ${theme.fontFamilies.default};
    font-size: 14px;
    color: #124469;
    background: #f6f7fa;
    line-height: 24px;
    -moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
  }
`;

export type Theme = typeof theme;
