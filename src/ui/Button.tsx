import styled from "styled-components";

import { colors } from "./colors";

export const Button = styled.button`
  text-transform: uppercase;
  align-items: center;
  background-color: ${colors.Primary};
  border: none;
  border-radius: 4px;
  bottom: 2rem;
  box-sizing: border-box;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  min-height: 40px;
  min-width: 112px;
  border: 1px solid #5928fa;
`;
