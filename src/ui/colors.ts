export enum colors {
  MainBackground = "#F5F5FA",
  SecondaryBackground = "#FFFFFF",
  LightGreyBackground = "#F9FAFB",
  GreenDot = "#23D7C8",
  GrayDot = "#BDC7D1",
  OrangeText = "#CC9D00",
  BoxShadow = "#e3e5ec",

  Primary = "#413078",
  PrimaryHover = "#3C05EA",

  SecondaryText = "#647B91",

  Separator = "#DCE3E9",
  Border = "#eaedf1",
  GreySecondaryText = "#647B91",
  DefaultText = "#413078"
}

export enum Semantic {
  primary = "primary",
  neutral = "neutral"
}

export const semanticColors: Record<Semantic, colors> = {
  [Semantic.primary]: colors.Primary,
  [Semantic.neutral]: colors.SecondaryBackground
};

export const semanticTextColors: Record<Semantic, colors> = {
  [Semantic.primary]: colors.SecondaryBackground,
  [Semantic.neutral]: colors.Primary
};
