type Opaque<K extends string, T> = T & { __TYPE__: K };

export type Color = Opaque<'Color', string>;

export const toColor = (color: string): Color => color as Color;
export const colorToString = (color: Color): string => color as string;

export const colors = {
  blue: toColor('#2d9ef7'),
  darkBlue: toColor('#124469'),
  green: toColor('#23D7C8'),
  grey: toColor('#8094a8'),
  lightBlue: toColor('#CCE6FF'),
  lightGrey: toColor('#FAFAFB'),
  yellow: toColor('#FFC400'),
  pink: toColor('#eb0073'),
  lightPurple: toColor('#f3efff'),
  purple: toColor('#5A28FA'),
  red: toColor('#f20000'),
  violet: toColor('#d200dc'),
  vividBlue: toColor('#43A5FF'),
  white: toColor('#fff'),
  whiteCreme: toColor('#FAFAFA'),
};

export enum Semantic {
  primary = 'primary',
  success = 'success',
  danger = 'danger',
  info = 'info',
  neutral = 'neutral',
}

export const semanticColors: Record<Semantic, Color> = {
  [Semantic.primary]: colors.purple,
  [Semantic.info]: colors.blue,
  [Semantic.success]: colors.green,
  [Semantic.danger]: colors.red,
  [Semantic.neutral]: colors.grey,
};
