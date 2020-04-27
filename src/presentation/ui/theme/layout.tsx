export const widths = {
  core: 1240,
  coreGap: 32,
  main: 720,
  min: 320,
  modal: 640,
  modalSmall: 480,
  modalMedium: 640,
  modalLarge: 960,
  notification: 576,
  panel: 512,
  filters: 256,
  searchFilter: 192,
  centralColumn: 448,
  largeInput: 320,
};

export const TABLET_MIN_WIDTH = 768;
export const DESKTOP_MIN_WIDTH = 1200;

export const breakpoints = {
  tabletAndLarger: `min-width: ${TABLET_MIN_WIDTH}px`,
  desktopAndLarger: `min-width: ${DESKTOP_MIN_WIDTH}px`,
  mobileAndSmaller: `max-width: ${TABLET_MIN_WIDTH - 1}px`,
  tabletAndSmaller: `max-width: ${DESKTOP_MIN_WIDTH - 1}px`,
};
