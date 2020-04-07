import React from "react";
import styled from "styled-components";

import { Semantic, semanticColors, semanticTextColors, colors } from "./colors";

export const SearchButton = styled.button<{ semantic?: Semantic }>`
  text-transform: uppercase;
  align-items: center;
  background-color: ${({ semantic = Semantic.primary }) =>
    semanticColors[semantic]};
  border: none;
  border-radius: 4px;
  bottom: 2rem;
  box-sizing: border-box;
  color: ${({ semantic = Semantic.primary }) => semanticTextColors[semantic]};
  cursor: pointer;
  display: flex;
  justify-content: center;
  min-height: 40px;
  min-width: 112px;
  border: 1px solid ${colors.Primary};

  &:hover {
    text-decoration: none;
    box-shadow: ${colors.ButtonHoverShadow} 0px 0px 0px 2px;
  }
`;

export const Button = styled.button`
  display: inline-block;
  border-radius: 4px;
  padding: 8px 16px;
  color: ${colors.ButtonText};
  background-color: ${colors.Primary};
  height: 40px;
  font-size: 12px;
  text-transform: uppercase;
  box-sizing: border-box;
  text-decoration: none;
  border: none;

  &:hover {
    cursor: pointer;
    box-shadow: ${colors.ButtonHoverShadow} 0px 0px 0px 2px;
  }
`;

export const TextButton = styled.button`
  display: inline-block;
  border-radius: 4px;
  padding: 8px 16px;
  color: ${colors.Primary};
  background-color: transparent;
  height: 40px;
  font-size: 12px;
  text-transform: uppercase;
  box-sizing: border-box;
  text-decoration: none;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

export const OutlineButton = styled.button`
  display: inline-block;
  border-radius: 4px;
  padding: 8px 16px;
  color: ${colors.Primary};
  border: 1px solid ${colors.Primary};
  height: 40px;
  font-size: 12px;
  text-transform: uppercase;
  box-sizing: border-box;
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }
`;

export const LinkButton = (props: {
  semantic?: Semantic;
  children: React.ReactNode;
  href: string;
}) => (
  <Button
    {...props}
    as={({ children, ...props }: { children: React.ReactNode }) => (
      <a {...props}>{children}</a>
    )}
  />
);
