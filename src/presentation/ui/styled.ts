import baseStyled, {
  css as baseCss,
  ThemedCssFunction,
  ThemedStyledInterface,
} from 'styled-components';

import { Theme } from './theme';

export const styled = baseStyled as ThemedStyledInterface<Theme>;
export const css = baseCss as ThemedCssFunction<Theme>;
