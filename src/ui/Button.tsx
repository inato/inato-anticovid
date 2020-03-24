import styled from "styled-components";

import { Semantic, semanticColors, semanticTextColors } from "./colors";

export const Button = styled.button<{ semantic?: Semantic }>`
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
  border: 1px solid #5928fa;
`;
