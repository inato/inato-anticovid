import * as React from "react";
import { keyframes, css } from "styled-components";

import { colors } from "./colors";

export interface CheckboxProps {
  id?: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const svgString = `%3Csvg%20fill%3D%22%235A28FA%22%20height%3D%2220%22%20version%3D%221.1%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpolygon%20points%3D%226.69614584%2011.645736%205.30385416%2013.0815368%209.75%2017.3929509%2018.6961458%208.71790039%2017.3038542%207.28209961%209.75%2014.6070491%22%3E%3C%2Fpolygon%3E%3C%2Fsvg%3E`;

const bounceAnimation = keyframes`
    0% { transform: translateX(-50%) translateY(-50%) scale(1.1); opacity: 1 }
    50% { transform: translateX(-50%) translateY(-50%) scale(1.6); opacity: .7; }
    60% { transform: translateX(-50%) translateY(-50%) scale(0.6); opacity: 1 }
    80% { transform: translateX(-50%) translateY(-50%) scale(0.95) }
    100% { transform: translateX(-50%) translateY(-50%) scale(0.85); opacity: 1 }
  `;

export const CheckboxMixin = css`
  display: inline-block;
  cursor: pointer;
  appearance: none;
  user-select: none;
  position: relative;
  border-radius: 4px;
  border: 1px solid ${colors.GreyBackground};
  width: 20px;
  min-width: 20px;
  height: 20px;
  transition: border .1s cubic-bezier(0, 0, 0.2, 1);
  margin: 0;
  background: white;

  &:after {
  content: url("data:image/svg+xml,${svgString}");
    top: 50%;
    left: 50%;
    position: absolute;
    width: 100%;
    height: 100%;
    display: block;
    opacity: 0;
    transform: translateX(-50%) translateY(-50%) scale(1);
  }

  &:hover {
    border: 1px solid ${colors.PrimaryHover};
    box-shadow: 0 0 0 2px ${colors.PurpleBoxShadow};
    transition: border .1s cubic-bezier(0.4, 0.0, 1, 1);
  }

  &:focus {
    outline: none;
    border: 1px solid ${colors.Primary};
    transition: border .1s cubic-bezier(0.4, 0.0, 1, 1);
  }

  &:checked {
    border: 1px solid ${colors.PrimaryHover};
    &:after {
      opacity: 1;
      animation: ${bounceAnimation} .25s cubic-bezier(0.4, 0.0, 1, 1) 1;
    }
  }
`;
