import styled from "styled-components";

import { colors, fontSize, fontWeight, lineHeight, devices } from "../../ui";

export const Title = styled.h1`
  font-family: Lora, Georgia;
  color: ${colors.Primary};
  font-size: ${fontSize.Medium};
  font-weight: ${fontWeight.SemiBold};
  line-height: ${lineHeight.Big};
  margin: 0;

  @media ${devices.Desktop} {
    font-size: ${fontSize.Big};
  }
`;
