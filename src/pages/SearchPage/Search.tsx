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

import {
  colors,
  devices,
  SearchButton,
  fontWeight,
  Disclaimer,
  SendUsFeedbackCard
} from "../../ui";
import config from "../../config";
import { useBoolean } from "../../hooks";

import { Facets } from "./Facets";
import { ClinicalTrialHit } from "./ClinicalTrialHit";
import { FilteringProps } from "./FilteringProps";
import icon from "./Filter.svg";

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

  const {
    isTrue: filtering,
    setToFalse: closeFiltering,
    setToTrue: openFiltering
  } = useBoolean(false);

  return (
    <Container>
      <InstantSearch
        searchClient={searchClient}
        indexName={config.algolia.index}
        onSearchStateChange={onSearchStateChange}
        searchState={searchState}
      >
        <Layout>
          <Facets filtering={filtering} closeFiltering={closeFiltering} />
          <SearchContainter filtering={filtering}>
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
            <StyledSendUsFeedbackCard />
            <Disclaimer />
          </SearchContainter>
        </Layout>
        <FilterButton
          type="button"
          onClick={() => {
            window.scrollTo(0, 0);
            openFiltering();
          }}
        >
          <FilterIcon src={icon} />
          filters
        </FilterButton>
      </InstantSearch>
    </Container>
  );
};

const StyledSendUsFeedbackCard = styled(SendUsFeedbackCard)`
  margin-top: 56px;

  @media ${devices.Desktop} {
    display: none;
  }
`;

const Container = styled.div`
  padding: 32px 16px;
  max-width: 1200px;
  margin: auto;
`;

const StyledSearchBox = styled(SearchBox)`
  .ais-SearchBox-input {
    height: 40px;
    border-radius: 4px;
    outline: none;
    color: ${colors.DefaultText};
    font-weight: ${fontWeight.Regular};
    &:focus {
      border: 1px solid ${colors.Primary};
      transition: border 0.1s cubic-bezier(0.4, 0, 1, 1) 0s;
      animation: 0.1s cubic-bezier(0.4, 0, 1, 1) 0s 1 normal none running dtOkaS;
      box-shadow: rgba(90, 40, 250, 0.2) 0px 0px 0px 2px;
    }
  }

  width: 100%;
  @media ${devices.Desktop} {
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

const SearchContainter = styled.div<FilteringProps>`
  width: 100%; /* for IE11 */
  display: ${({ filtering }) => (filtering ? "none" : undefined)};
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

const FilterButton = styled(SearchButton)`
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
  left: 50%;
  position: fixed;
  transform: translateX(-50%);

  @media ${devices.Desktop} {
    display: none;
  }
`;

const FilterIcon = styled.img`
  margin-right: 8px;
  width: 16px;
  height: 16px;
`;
