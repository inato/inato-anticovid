import React, { useState, useCallback, useMemo, createContext } from "react";
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

import { colors, devices, Button, fontWeight, Disclaimer } from "../ui";
import config from "../config";

import { Facets } from "./Facets";
import { ClinicalTrialHit } from "./ClinicalTrialHit";
import { FilteringProps } from "./FilteringProps";

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

const useBoolean = (initialValue: boolean) => {
  const [isTrue, setState] = useState(() => initialValue);
  const setToTrue = useCallback(() => setState(() => true), []);
  const setToFalse = useCallback(() => setState(() => false), []);
  const toggle = useCallback(() => setState(prev => !prev), []);

  return useMemo(
    () => ({
      isTrue,
      isFalse: !isTrue,
      setToTrue,
      setToFalse,
      toggle
    }),
    [isTrue, setToFalse, setToTrue, toggle]
  );
};

type FilteringContext = {
  filtering: boolean;
  closeFiltering: () => void;
};

export const filteringContext = createContext<FilteringContext>(null as any); // FIX ME

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
          <filteringContext.Provider value={{ filtering, closeFiltering }}>
            <Facets />
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
              <Disclaimer />
            </SearchContainter>
          </filteringContext.Provider>
        </Layout>
        <FilterButton
          type="button"
          onClick={() => {
            window.scrollTo(0, 0);
            openFiltering();
          }}
        >
          filters
        </FilterButton>
      </InstantSearch>
    </Container>
  );
};

const Container = styled.div`
  padding: 32px 10vw;
  max-width: 1200px;
  @media ${devices.Desktop} {
    padding: 32px 120px;
  }
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

const FilterButton = styled(Button)`
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
  left: 50%;
  position: fixed;
  transform: translateX(-50%);

  @media ${devices.Desktop} {
    display: none;
  }
`;
