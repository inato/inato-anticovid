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

import config from "../config/config.json";
import { colors } from "../ui";
import { Disclaimer } from "../Disclaimer";

import { Facets } from "./Facets";
import { ClinicalTrialHit } from "./ClinicalTrialHit";

const searchClient = algoliasearch(
  config.algolia.applicationId,
  config.algolia.publicApiKey
);

export const SearchPage = () => {
  return (
    <Container>
      <InstantSearch
        searchClient={searchClient}
        indexName={config.algolia.index}
      >
        <Layout>
          <Facets />
          <SearchContainter>
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
            <Disclaimer />
          </SearchContainter>
        </Layout>
      </InstantSearch>
    </Container>
  );
};

const Container = styled.div`
  padding: 32px 120px;
  max-width: 1200px;
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
    color: ${colors.DefaultText};
  }
`;

const Layout = styled.div`
  display: flex;
  margin-top: 24px;
`;

const SearchContainter = styled.div``;

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
    border: none;
    box-shadow: none;
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
