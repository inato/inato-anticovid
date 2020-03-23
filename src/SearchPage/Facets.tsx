import React, { useContext } from "react";
import { ClearRefinements, RefinementList } from "react-instantsearch-dom";
import styled from "styled-components";

import { colors, device } from "../ui";

import { filteringContext } from "./Search";

export const Facets = () => {
  const { filtering } = useContext(filteringContext);
  return (
    <FacetsContainer filtering={filtering}>
      <Header>
        <h1>Filters</h1>
        <ClearRefinements />
      </Header>
      <Facet
        attribute="therapeutic_classes"
        title="Therapeutic Classes"
        searchable
        showMore
      />
      <Facet attribute="clinical_outcome_extracted_" title="Clinical Outcome" />
      <Facet
        attribute="surrogate_outcome_extracted_"
        title="Surrogate Outcome"
      />
      <Facet attribute="recruitment_status" title="Recruitment Status" />
      <Facet attribute="study_type" title="Study Type" showMore />
      <Facet attribute="countries" title="Countries" />
    </FacetsContainer>
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

  h3 {
    margin: 0;
    margin-bottom: 4px;
    font-size: 14px;
    font-weight: normal;
    color: ${colors.SecondaryText};
    text-transform: uppercase;
  }

  .ais-RefinementList-item {
    font-size: 14px;
  }

  .ais-RefinementList-showMore {
    font-size: 12px;
    background: inherit;
    color: ${colors.DefaultText};
    border: 1px solid ${colors.DefaultText};
  }
  .ais-RefinementList-showMore--disabled {
    border: 1px solid ${colors.Border};
  }
`;

type FacetsContainerProps = { filtering: boolean };
const FacetsContainer = styled.div<FacetsContainerProps>`
  align-self: flex-start;
  min-width: 265px;
  background: ${colors.SecondaryBackground};
  padding: 16px;
  margin-right: 32px;
  margin-bottom: 8px;
  border: 1px solid ${colors.Border};
  box-sizing: border-box;
  border-radius: 4px;

  h1 {
    font-size: 18px;
    font-weight: normal;
    margin: 0;
  }

  .ais-ClearRefinements-button {
    background: inherit;
    color: ${colors.DefaultText};
    border: 1px solid ${colors.DefaultText};
    font-size: 12px;
  }
  .ais-ClearRefinements-button--disabled {
    border: 1px solid ${colors.Border};
  }

  display: ${({ filtering }) => (filtering ? undefined : "none")};
  position: absolute;
  @media ${device.sm} {
    display: initial;
    position: initial;
  }
`;

const Header = styled.div`
  color: ${colors.DefaultText};
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 16px;
`;
