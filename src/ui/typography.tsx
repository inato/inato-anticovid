import { styled } from "./styled";

/** @component */
export const H1 = styled.h1`
  font-size: ${props => props.theme.fontSizes.big}px;
  font-weight: ${props => props.theme.fontWeights.semiBold};
  color: ${props => props.theme.colors.darkBlue};
  text-transform: none;
  margin: 0;
  line-height: ${props => props.theme.lineHeights.larger}px;
`;

/** @component */
export const H3 = styled.h3`
  font-size: ${props => props.theme.fontSizes.largest}px;
  line-height: ${props => props.theme.lineHeights.large}px;
  font-weight: ${props => props.theme.fontWeights.medium};
  margin: 0;
`;
