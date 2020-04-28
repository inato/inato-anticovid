export const breakpoints = {
  Tablet: 768,
  Desktop: 1200,
};

export const devices = {
  Tablet: `(min-width: ${breakpoints.Tablet}px)`,
  Desktop: `(min-width: ${breakpoints.Desktop}px)`,
  Touchable: `(hover: none) and (pointer: coarse)`,
};
