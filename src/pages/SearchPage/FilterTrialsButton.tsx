import React from "react";
import { connectStats } from "react-instantsearch-dom";
import styled from "styled-components";

import { Button } from "../ui";

const formatTrialsString = (nbHits: number) =>
  nbHits === 1 ? "1 trial" : `${nbHits} trials`;

const Component = connectStats(
  ({
    nbHits,
    onClick,
    className
  }: {
    nbHits: number;
    onClick: () => void;
    className?: string;
  }) => (
    <Button onClick={onClick} className={className}>
      Filter ({formatTrialsString(nbHits)})
    </Button>
  )
);
export const FilterTrialsButton = styled(Component)`
  padding: 0 24px;
`;
