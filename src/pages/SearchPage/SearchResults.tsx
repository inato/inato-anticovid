import React from "react";
import { Hits, Pagination, connectStats } from "react-instantsearch-dom";
import styled from "styled-components";

import { colors } from "../../ui";

import { ClinicalTrialHit } from "./ClinicalTrialHit";
import { EmptyResults } from "./EmptyResults";

export const SearchResults = connectStats(({ nbHits }: { nbHits: number }) =>
  nbHits === 0 ? (
    <EmptyResults />
  ) : (
    <>
      <StyledHits hitComponent={ClinicalTrialHit} />
      <StyledPagination showFirst={false} padding={2} />
    </>
  )
);

const StyledHits = styled(Hits)`
  .ais-Hits-list {
    margin: 0;
  }

  .ais-Hits-item {
    margin: 0;
    margin-bottom: 8px;
    padding: 0;
    width: 100%;
    border: none;
    box-shadow: none;
  }
`;

const StyledPagination = styled(Pagination)`
  margin-top: 24px;
  .ais-Pagination-link {
    color: ${colors.Primary};
    border-color: ${colors.Separator};
  }
  .ais-Pagination-link--selected {
    color: ${colors.SecondaryBackground};
    background: ${colors.Primary};
  }
`;
