import React from 'react';
import { RefinementList } from 'react-instantsearch-dom';
import styled from 'styled-components';
import { format } from 'date-fns';

import {
  colors,
  devices,
  fontWeight,
  Newsletter,
  SubscribeButton,
  CheckboxMixin,
  ToggleRefinementWithCount,
  OutlineButton,
} from '../../ui';
import { PoweredByAlgolia } from '../../ui/PoweredByAlgolia';

import { ResetFilters } from './ResetFilters';
import { FilteringProps } from './FilteringProps';
import { FilterTrialsButton } from './FilterTrialsButton';
import { RangeSlider } from './RangeSlider';

export const Facets = ({
  filtering,
  closeFiltering,
  openSubscriptionModal,
  hasActiveSearchFilters,
}: {
  filtering: boolean;
  closeFiltering: () => void;
  openSubscriptionModal: () => void;
  hasActiveSearchFilters: boolean;
}) => {
  return (
    <LeftPanel filtering={filtering}>
      <FacetsContainer data-cy="search/filters">
        <Header>
          Filters
          <ResetFilters />
        </Header>
        <FacetContainer>
          <ToggleRefinementWithCount
            attribute="has_results_publications"
            label="Only with published results"
            value
          />
        </FacetContainer>
        <Facet attribute="recruitment_status" title="Recruitment Status" />
        <Facet
          attribute="therapeutic_classes"
          title="Therapeutic Classes"
          searchable
          showMore
        />
        <FacetContainer>
          <h3>Recruitment target</h3>
          <RangeSlider
            attribute="total_recruitment_size"
            maxAllowedValue={10000}
          />
        </FacetContainer>
        <Facet
          attribute="clinical_outcome_extracted_"
          title="Clinical Outcome"
        />
        <FacetContainer>
          <h3>Registration date</h3>
          <RangeSlider
            attribute="registration_timestamp"
            formatValueForDisplay={formatDate}
          />
        </FacetContainer>
        <Facet attribute="study_type" title="Study Type" showMore />
        <Facet attribute="countries" title="Countries" searchable showMore />
        <Facet
          attribute="surrogate_outcome_extracted_"
          title="Surrogate Outcome"
        />
        <Footer>
          {hasActiveSearchFilters && (
            <OpenSubscriptionModalButton onClick={openSubscriptionModal}>
              Get Update alerts
            </OpenSubscriptionModalButton>
          )}
          <FilterTrialsButton
            onClick={closeFiltering}
            data-cy="search/filters/mobile-close"
          />
        </Footer>
      </FacetsContainer>
      <StyledNewsletter />
      <DesktopPoweredByAlgolia />
    </LeftPanel>
  );
};

const formatDate = (timestamp?: number) =>
  timestamp ? format(new Date(timestamp), 'MMM d, uu') : '';

const Facet = ({
  attribute,
  title,
  searchable = false,
  showMore = false,
}: {
  attribute: string;
  title: string;
  searchable?: boolean;
  showMore?: boolean;
}) => {
  return (
    <FacetContainer>
      <h3>{title}</h3>
      <RefinementList
        attribute={attribute}
        searchable={searchable}
        showMore={showMore}
        showMoreLimit={30}
        limit={7}
      />
    </FacetContainer>
  );
};

const FacetContainer = styled.div`
  padding-bottom: 24px;
  color: ${colors.DarkGray};

  h3 {
    margin: 0;
    margin-bottom: 4px;
    font-size: 12px;
    font-weight: normal;
    color: ${colors.SecondaryText};
    text-transform: uppercase;
  }

  .ais-RefinementList-item {
    font-size: 14px;
    line-height: 28px;
  }

  .ais-RefinementList-label,
  .ais-ToggleRefinement-label {
    cursor: pointer;
  }

  .ais-RefinementList-labelText,
  .ais-ToggleRefinement-labelText {
    margin-left: 6px;
    color: ${colors.DefaultText};
  }

  .ais-RefinementList-checkbox,
  .ais-ToggleRefinement-checkbox {
    top: 4px;
    ${CheckboxMixin}
  }

  .ais-RefinementList-showMore {
    font-size: 10px;
    background: inherit;
    background-color: ${colors.SecondaryBackground}; /* For IE11 */
    color: ${colors.GreySecondaryText};
    text-transform: uppercase;
    font-weight: ${fontWeight.SemiBold};
    margin: 0;
    padding: 0;

    &:hover {
      color: ${colors.Primary};
    }

    &.ais-RefinementList-showMore--disabled {
      display: none;
    }
  }

  .ais-RefinementList-count,
  .ais-ToggleRefinement-count {
    background-color: ${colors.Border};
    color: ${colors.GreySecondaryText};
    margin-left: 2px;
  }

  .ais-ToggleRefinement-count {
    margin-left: 5px;
  }

  .ais-RefinementList-showMore--disabled {
    border: 1px solid ${colors.Border};
  }

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
`;

const FacetsContainer = styled.div``;

const StyledNewsletter = styled(Newsletter)`
  display: none;

  ${SubscribeButton} {
    margin-top: 8px;
  }

  @media ${devices.Desktop} {
    display: inherit;
  }
`;

const DesktopPoweredByAlgolia = styled(PoweredByAlgolia)`
  display: none;

  @media ${devices.Desktop} {
    display: flex;
    margin-top: 12px;
  }
`;

const LeftPanel = styled.div<FilteringProps>`
  align-self: flex-start;

  display: ${({ filtering }) => (filtering ? 'block' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;

  ${FacetsContainer}, ${StyledNewsletter} {
    background: ${colors.SecondaryBackground};
    padding: 16px 16px 80px 16px;
    border: 1px solid ${colors.Border};
    box-sizing: border-box;
    border-radius: 4px;
  }

  ${FacetsContainer} {
    margin-bottom: 16px;
  }

  @media ${devices.Desktop} {
    display: block;
    position: static;
    top: auto;
    left: auto;
    width: 265px;
    min-width: 265px;
    z-index: 0;
    margin-right: 32px;

    ${FacetsContainer}, ${StyledNewsletter} {
      padding: 16px;
    }
  }
`;

const OpenSubscriptionModalButton = styled(OutlineButton)`
  background-color: white;
`;

const Header = styled.div`
  color: ${colors.Primary};
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  align-items: flex-end;
  font-size: 14px;
  line-height: 24px;
  font-weight: ${fontWeight.Medium};
`;

const Footer = styled.div`
  position: fixed;
  z-index: 3;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  left: 0;
  bottom: 0;
  padding: 16px;
  border-top: 1px solid ${colors.Border};
  background-color: ${colors.SecondaryBackground};

  @media ${devices.Desktop} {
    display: none;
  }
`;
