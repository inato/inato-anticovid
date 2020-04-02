import React from "react";
import { connectStats } from "react-instantsearch-dom";
import styled from "styled-components";

import { Button } from "../../ui";

const formatTrialsString = (nbHits: number) => {
  if (nbHits <= 1) return `${nbHits} trial`;
  return `${nbHits} trials`;
};

const Component = connectStats(
  ({
    nbHits,
    onClick,
    className,
    ...props
  }: {
    nbHits: number;
    onClick: () => void;
    className?: string;
  }) => (
    <Button onClick={onClick} className={className} {...props}>
      Filter ({formatTrialsString(nbHits)})
    </Button>
  )
);
export const FilterTrialsButton = styled(Component)`
  padding: 0 24px;
`;
