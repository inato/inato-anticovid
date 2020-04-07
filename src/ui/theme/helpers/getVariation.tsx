import { darken, lighten } from "polished";

import { toColor, Color, colorToString } from "../color";

export type Variation = 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;

export const getVariation = (color: Color, variation: Variation): Color => {
  switch (variation) {
    case 10:
      return toColor(lighten(0.4, colorToString(color)));
    case 20:
      return toColor(lighten(0.35, colorToString(color)));
    case 30:
      return toColor(lighten(0.3, colorToString(color)));
    case 40:
      return toColor(lighten(0.2, colorToString(color)));
    case 50:
      return toColor(lighten(0.1, colorToString(color)));
    case 60:
      return toColor(colorToString(color));
    case 70:
      return toColor(darken(0.1, colorToString(color)));
    case 80:
      return toColor(darken(0.2, colorToString(color)));
    case 90:
      return toColor(darken(0.3, colorToString(color)));
    case 100:
      return toColor(darken(0.35, colorToString(color)));
    default:
      return toColor(colorToString(color));
  }
};
