export enum colors {
  MainBackground = '#F5F5FA',
  SecondaryBackground = '#FFFFFF',
  LightGreyBackground = '#F9FAFB',
  LightPurpleBackground = '#F3EFFF',
  GreenDot = '#23D7C8',
  GreyBackground = '#BDC7D1',
  OrangeText = '#CC9D00',
  BoxShadow = '#e3e5ec',
  PurpleBoxShadow = 'rgba(89, 40, 250, 0.4)',

  ModalOverlay = 'rgba(53, 48, 69, 0.2)',
  ModalShadow = 'rgba(18, 68, 105, 0.2)',

  DarkGray = '#333333',

  Primary = '#413078', // Dark purple
  PrimaryHover = '#636292',

  ButtonText = '#FFFFFF',
  ButtonHoverShadow = '#b2a6d8',
  ButtonLightHover = '#E2DDF3',
  HeaderInactiveText = '#DADAE7',
  SecondaryText = '#647B91',

  Separator = '#DCE3E9',
  Border = '#eaedf1',
  GreySecondaryText = '#647B91',
  DefaultText = '#433C59',

  DefaultTextHover = '#9E9EB4',
  RedAlert = '#BF0000',
  GreenAlert = '#1CAB9F',
  HighlightDarkBackground = '#D1C8EE',
  HighlightLightBackground = '#E8E4F6',
}

export enum Semantic {
  primary = 'primary',
  neutral = 'neutral',
}

export const semanticColors: Record<Semantic, colors> = {
  [Semantic.primary]: colors.Primary,
  [Semantic.neutral]: colors.ButtonText,
};

export const semanticTextColors: Record<Semantic, colors> = {
  [Semantic.primary]: colors.ButtonText,
  [Semantic.neutral]: colors.Primary,
};
