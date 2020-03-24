import React from "react";
import { connectCurrentRefinements } from "react-instantsearch-dom";
import styled from "styled-components";

import { UndoIcon, colors } from "../ui";

const ResetFiltersComponent = ({ items, refine, className }: any) => (
  <button
    onClick={() => refine(items)}
    disabled={!items.length}
    type="submit"
    className={className}
  >
    <StyledUndoIcon
      color={items.length ? colors.DefaultText : colors.SecondaryText}
    />
    reset filters
  </button>
);

const StyledUndoIcon = styled(UndoIcon)`
  margin-right: 4px;
`;

const ConnectedResetFiltersComponent = connectCurrentRefinements(
  ResetFiltersComponent
);
export const ResetFilters = styled(ConnectedResetFiltersComponent)`
  background: inherit;
  outline: none;
  font-size: 12px;
  line-height: 24px;
  border: none;
  color: ${colors.DefaultText};
  cursor: pointer;
  text-transform: uppercase;
  padding: 0;
  :disabled {
    color: ${colors.SecondaryText};
    cursor: normal;
  }
`;
