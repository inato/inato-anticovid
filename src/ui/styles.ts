import { css, FlattenSimpleInterpolation } from "styled-components";

import { colors } from "./colors";
import { devices } from "./media";

export const linkCss = css`
  text-decoration: none;
  color: ${colors.Primary};
  padding-bottom: 3px;
  border-bottom: 1px solid ${colors.Primary};
  &:hover {
    color: ${colors.PrimaryHover};
    border-bottom-color: ${colors.DefaultTextHover};
  }

  @media ${devices.Desktop} {
    display: inline-block;
    padding-bottom: 0;
    border-bottom: 0;

    &:hover,
    &:focus {
      cursor: pointer;
      color: ${colors.PrimaryHover};
    }

    &::after {
      content: "";
      display: block;
      margin-top: -2px;
      border-bottom: 1px solid ${colors.Primary};
      width: 100%;
    }

    &:hover::after {
      content: "";
      width: 100%;
      border-bottom-color: ${colors.DefaultTextHover};
      animation: increase-width 0.3s;
    }

    @keyframes increase-width {
      0% {
        width: 0;
      }
      100% {
        width: 100%;
      }
    }
  }
`;

export const placeholderCss = (style: FlattenSimpleInterpolation) => css`
  &::-webkit-input-placeholder {
    ${style}
  }
  &:-moz-placeholder {
    ${style}
  }
  &::-moz-placeholder {
    ${style}
  }
  &::-moz-p {
    ${style}
  }
  &:-ms-input-placeholder {
    ${style}
  }
  &::placeholder {
    ${style}
  }
`;
