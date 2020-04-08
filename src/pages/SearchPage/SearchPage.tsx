import React, { useCallback, useMemo } from "react";
import algoliasearch from "algoliasearch";
import { InstantSearch, SearchBox, Stats } from "react-instantsearch-dom";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import qs from "qs";

import {
  colors,
  devices,
  SearchButton,
  fontWeight,
  Disclaimer,
  SendUsFeedbackCard,
  Button,
  AlarmBellRingIcon,
  SuccessAlert
} from "../../ui";
import config from "../../config";
import { useBoolean } from "../../hooks";
import { PoweredByAlgolia } from "../../ui/PoweredByAlgolia";

import { Facets } from "./Facets";
import { FilteringProps } from "./FilteringProps";
import icon from "./Filter.svg";
import { SearchSuggestions } from "./SearchSuggestions";
import { SearchResults } from "./SearchResults";
import { UpdateAlertsModal } from "./UpdateAlertsModal";

const searchClient = algoliasearch(
  config.algolia.applicationId,
  config.algolia.publicApiKey
);

const cleanNullValues = (obj: {
  [key: string]: unknown | null | undefined;
}): { [key: string]: unknown | null | undefined } =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (!value) {
      return acc;
    }
    if (value instanceof Object) {
      return { ...acc, [key]: cleanNullValues(value as any) };
    }

    return { ...acc, [key]: value };
  }, {});

const createURL = (state: { [key: string]: unknown }) =>
  `?${qs.stringify(cleanNullValues(state))}`;

export const searchStateToUrl = (
  location: ReturnType<typeof useHistory>["location"],
  searchState: { [key: string]: unknown }
) => (searchState ? `${location.pathname}${createURL(searchState)}` : "");

const urlToSearchState = (
  location: ReturnType<typeof useHistory>["location"]
) => qs.parse(location.search.slice(1));

const hasActiveSearchFilters = (searchState: {
  refinementList?: { [key: string]: Array<string> };
  toggle?: { [key: string]: string };
}) =>
  Object.keys(searchState?.refinementList ?? {}).length > 0 ||
  Object.keys(searchState?.toggle ?? {}).length > 0;

const Container = styled.div`
  padding: 32px 16px;
  max-width: 1200px;
  margin: auto;
`;

const Layout = styled.div`
  display: flex;
`;

const SearchContainer = styled.div<FilteringProps>`
  width: 100%; /* for IE11 */
  display: ${({ filtering }) => (filtering ? "none" : undefined)};
`;

const SearchTop = styled.div`
  display: flex;
  align-items: center;
`;

const StyledSuccessAlert = styled(SuccessAlert)`
  margin-bottom: 24px;
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

const GetUpdateAlertsButton = styled(Button)`
  display: none;
  @media ${devices.Desktop} {
    display: inline-flex;
    align-items: center;
    margin-left: 14px;
    color: ${colors.Primary};
    background-color: transparent;
    padding: 8px 16px;

    &:hover {
      box-shadow: none;
      background-color: ${colors.ButtonLightHover};
    }
  }
`;

const ButtonText = styled.span`
  padding-left: 8px;
`;

const StyledStats = styled(Stats)`
  padding-top: 18px;

  margin-bottom: 24px;

  .ais-Stats-text {
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    color: ${colors.Primary};
  }
`;

const MobilePoweredByAlgolia = styled(PoweredByAlgolia)`
  justify-content: center;
  margin-top: 56px;

  @media ${devices.Desktop} {
    display: none;
  }
`;

const StyledSendUsFeedbackCard = styled(SendUsFeedbackCard)`
  margin-top: 48px;

  @media ${devices.Desktop} {
    display: none;
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

export const SearchPage = () => {
  const history = useHistory();
  const searchState = useMemo(() => urlToSearchState(history.location), [
    history.location
  ]);

  const displayGetUpdateAlertsButton = useMemo(
    () => hasActiveSearchFilters(searchState),
    [searchState]
  );

  const hasUnsubscribedFromAlerts = useMemo(() => {
    return !!searchState.unsubscribedFromAlerts;
  }, [searchState]);

  const onSearchStateChange = useCallback(
    (searchState: { [key: string]: unknown }) => {
      history.replace(
        searchStateToUrl(history.location, searchState),
        searchState as any
      );
    },
    [history]
  );

  const {
    isTrue: filtering,
    setToFalse: closeFiltering,
    setToTrue: openFiltering
  } = useBoolean(false);

  const {
    isTrue: isModalOpen,
    setToFalse: closeModal,
    setToTrue: openModal
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
          <Facets
            filtering={filtering}
            closeFiltering={closeFiltering}
            openSubscriptionModal={openModal}
            hasActiveSearchFilters={displayGetUpdateAlertsButton}
          />
          <SearchContainer filtering={filtering} data-cy="search/container">
            {hasUnsubscribedFromAlerts && (
              <StyledSuccessAlert closable>
                You have been successfully unsubscribed from this alert
              </StyledSuccessAlert>
            )}
            <SearchTop>
              <StyledSearchBox
                translations={{
                  placeholder: "Search by keyword, drug, NCTID, ..."
                }}
              />
              {displayGetUpdateAlertsButton && (
                <GetUpdateAlertsButton onClick={openModal}>
                  <AlarmBellRingIcon />
                  <ButtonText>Get update alerts</ButtonText>
                </GetUpdateAlertsButton>
              )}
            </SearchTop>
            <SearchSuggestions />
            <StyledStats
              translations={{
                stats(nbHits) {
                  if (nbHits <= 1) return `${nbHits} trial found`;
                  return `${nbHits} trials found`;
                }
              }}
            />
            <SearchResults />
            <MobilePoweredByAlgolia />
            <StyledSendUsFeedbackCard />
            <Disclaimer />
          </SearchContainer>
        </Layout>
        <FilterButton
          type="button"
          onClick={() => {
            window.scrollTo(0, 0);
            openFiltering();
          }}
          data-cy="search/filters/mobile-open"
        >
          <FilterIcon src={icon} />
          filters
        </FilterButton>
      </InstantSearch>
      {isModalOpen && (
        <UpdateAlertsModal
          onRequestClose={closeModal}
          searchState={searchState}
        />
      )}
    </Container>
  );
};
