import { borderRadiuses } from './border';
import { colors, semanticColors } from './color';
import { fontFamilies, fontSizes, lineHeights, fontWeights } from './font';
import { getVariation } from './helpers';
import { breakpoints, widths } from './layout';
import { shadows } from './shadow';
import { spacings } from './spacing';
import { zIndexes } from './zindex';

export * from './color';

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
  zIndexes,
};

export type Theme = typeof theme;
