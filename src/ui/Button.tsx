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
  }
`;

export const Button = styled.button`
  display: inline-block;
  border-radius: 4px;
  padding: 8px 16px;
  color: ${colors.SecondaryBackground};
  background-color: ${colors.Primary};
  height: 40px;
  font-size: 12px;
  text-transform: uppercase;
  box-sizing: border-box;

  &:hover {
    cursor: pointer;
    background-color: ${colors.PrimaryHover};
    box-shadow: rgba(60, 5, 234, 0.2) 0px 0px 0px 2px;
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
