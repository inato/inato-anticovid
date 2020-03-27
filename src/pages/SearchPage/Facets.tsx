import React from "react";
import { RefinementList } from "react-instantsearch-dom";
import styled from "styled-components";

import {
  colors,
  devices,
  fontWeight,
  Newsletter,
  SubscribeButton,
  CheckboxMixin
} from "../../ui";

import { ResetFilters } from "./ResetFilters";
import { FilteringProps } from "./FilteringProps";
import { FilterTrialsButton } from "./FilterTrialsButton";

export const Facets = ({
  filtering,
  closeFiltering
}: {
  filtering: boolean;
  closeFiltering: () => void;
}) => {
  return (
    <LeftPanel filtering={filtering}>
      <FacetsContainer>
        <Header>
          Filters
          <ResetFilters />
        </Header>
        <Facet attribute="recruitment_status" title="Recruitment Status" />
        <Facet
          attribute="therapeutic_classes"
          title="Therapeutic Classes"
          searchable
          showMore
        />
        <Facet
          attribute="clinical_outcome_extracted_"
          title="Clinical Outcome"
        />
        <Facet
          attribute="surrogate_outcome_extracted_"
          title="Surrogate Outcome"
        />
        <Facet attribute="study_type" title="Study Type" showMore />
        <Facet attribute="countries" title="Countries" />
        <Footer>
          <FilterTrialsButton onClick={closeFiltering} />
        </Footer>
      </FacetsContainer>
      <StyledNewsletter />
    </LeftPanel>
  );
};

const Facet = ({
  attribute,
  title,
  searchable = false,
  showMore = false
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

  .ais-RefinementList-labelText {
    padding-left: 6px;
    color: ${colors.DefaultText};
  }

  .ais-RefinementList-checkbox {
    top: 4px;
    ${CheckboxMixin}
  }

  .ais-RefinementList-showMore {
    font-size: 10px;
    background: inherit;
    color: ${colors.GreySecondaryText};
    text-transform: uppercase;
    font-weight: ${fontWeight.SemiBold};
    margin: 0;
    padding: 0;

    &.ais-RefinementList-showMore--disabled {
      display: none;
    }
  }

  .ais-RefinementList-count {
    background-color: ${colors.Border};
    color: ${colors.GreySecondaryText};
    margin-left: 2px;
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

const LeftPanel = styled.div<FilteringProps>`
  align-self: flex-start;
  min-width: 265px;

  display: ${({ filtering }) => (filtering ? undefined : "none")};
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
    display: initial;
    position: initial;
    top: auto;
    left: auto;
    width: auto;
    z-index: 0;

    ${FacetsContainer}, ${StyledNewsletter} {
      margin-right: 32px;
      padding: 16px;
    }
  }
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
  width: calc(100% - 32px);
  left: 0;
  bottom: 0;
  padding: 16px;
  border-top: 1px solid ${colors.Border};
  background-color: ${colors.SecondaryBackground};
  justify-content: center;
  display: flex;
  @media ${devices.Desktop} {
    display: none;
  }
`;
