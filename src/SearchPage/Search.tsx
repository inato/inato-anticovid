import React, { useState, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import algoliasearch from "algoliasearch";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Stats,
  Pagination
} from "react-instantsearch-dom";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import qs from "qs";

import config from "../config/config.json";
import { colors, device } from "../ui";

import { Disclaimer } from "./Disclaimer";
import { Facets } from "./Facets";
import { ClinicalTrialHit } from "./ClinicalTrialHit";

const DEBOUNCE_SET_SEARCH_IN_MS = 1000;

const searchClient = algoliasearch(
  config.algolia.applicationId,
  config.algolia.publicApiKey
);

const createURL = (state: unknown) => `?${qs.stringify(state)}`;

const searchStateToUrl = (
  location: ReturnType<typeof useHistory>["location"],
  searchState: unknown
) => (searchState ? `${location.pathname}${createURL(searchState)}` : "");

const urlToSearchState = (
  location: ReturnType<typeof useHistory>["location"]
) => qs.parse(location.search.slice(1));

export const SearchPage = () => {
  const history = useHistory();
  const [searchState, setSearchState] = useState(
    urlToSearchState(history.location)
  );
  const [onSearchStateChangeDebounced] = useDebouncedCallback(
    (searchState: unknown) => {
      history.replace(
        searchStateToUrl(history.location, searchState),
        searchState as any
      );
    },
    DEBOUNCE_SET_SEARCH_IN_MS
  );

  const onSearchStateChange = useCallback(
    (searchState: unknown) => {
      setSearchState(searchState);
      onSearchStateChangeDebounced(searchState);
    },
    [onSearchStateChangeDebounced]
  );

  return (
    <Container>
      <InstantSearch
        searchClient={searchClient}
        indexName={config.algolia.index}
        onSearchStateChange={onSearchStateChange}
        searchState={searchState}
      >
        <Layout>
          <Facets />
          <SearchContainter>
            <StyledSearchBox
              translations={{
                placeholder: "Search by keyword, drug, ..."
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
            <StyledPagination showFirst={false} padding={2} />
            <Disclaimer />
          </SearchContainter>
        </Layout>
      </InstantSearch>
    </Container>
  );
};

const Container = styled.div`
  padding: 32px 10vw;
  max-width: 1200px;
  @media ${device.sm} {
    padding: 32px 120px;
  }
`;

const StyledSearchBox = styled(SearchBox)`
  .ais-SearchBox-input {
    height: 40px;
  }

  @media ${device.sm} {
    width: 50%;
    min-width: 500px;
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
`;

const SearchContainter = styled.div`
  width: 100%; /* for IE11 */
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
    border: none;
    box-shadow: none;
  }

  max-width: 80vw;
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
