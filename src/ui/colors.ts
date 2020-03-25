export enum colors {
  MainBackground = "#F5F5FA",
  SecondaryBackground = "#FFFFFF",
  LightGreyBackground = "#F9FAFB",
  LightPurpleBackground = "#F3EFFF",
  GreenDot = "#23D7C8",
  GrayDot = "#BDC7D1",
  OrangeText = "#CC9D00",
  BoxShadow = "#e3e5ec",

  Primary = "#413078",
  PrimaryHover = "#726798",

  ButtonText = "#FFFFFF",
  HeaderInactiveText = "#DADAE7",
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
  [Semantic.neutral]: colors.ButtonText
};

export const semanticTextColors: Record<Semantic, colors> = {
  [Semantic.primary]: colors.ButtonText,
  [Semantic.neutral]: colors.Primary
};
