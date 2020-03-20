import React from "react";
import algoliasearch from "algoliasearch";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Stats,
  Pagination
} from "react-instantsearch-dom";
import styled from "styled-components";

import { colors } from "../ui";
import { ClinicalTrialHit } from "./ClinicalTrialHit";

const applicationId = "QC98I887KP";
const apiKey = "8675d3f84bdc4dd1412aa3baa1854319";
const searchClient = algoliasearch(applicationId, apiKey);

const indexName = "prod_data";

export const SearchPage = () => {
  return (
    <Container>
      <InstantSearch searchClient={searchClient} indexName={indexName}>
        <StyledSearchBox
          translations={{
            placeholder: "Search for clinical trials on Covid-19"
          }}
        />
        <StyledStats
          translations={{
            stats(nbHits, timeSpentMS) {
              return `${nbHits} trials found`;
            }
          }}
        />
        <StyledHits hitComponent={ClinicalTrialHit} />
        <StyledPagination />
      </InstantSearch>
    </Container>
  );
};

const Container = styled.div`
  padding: 32px 120px;
`;

const StyledSearchBox = styled(SearchBox)`
  width: 50%;
  min-width: 500px;

  .ais-SearchBox-input {
    height: 40px;
  }
`;

const StyledStats = styled(Stats)`
  padding-top: 18px;

  .ais-Stats-text {
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
  }
`;

const StyledHits = styled(Hits)`
  .ais-Hits-list {
    margin: 0;
    margin-top: 24px;
  }

  .ais-Hits-item {
    margin: 0;
    margin-bottom: 8px;
    padding: 0;
    width: 100%;
  }
`;

const StyledPagination = styled(Pagination)`
  padding: 24px 0;
  .ais-Pagination-link {
    color: ${colors.Primary};
    border-color: ${colors.Separator};
  }
  .ais-Pagination-link--selected {
    color: ${colors.SecondaryBackground};
    background: ${colors.Primary};
  }
`;
