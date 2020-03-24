import React, { useContext } from "react";
import { RefinementList, connectStats } from "react-instantsearch-dom";
import styled from "styled-components";

import { colors, devices, Button } from "../ui";

import { filteringContext } from "./Search";
import { ResetFilters } from "./ResetFilters";

export const Facets = () => {
  const { filtering, closeFiltering } = useContext(filteringContext);
  return (
    <FacetsContainer filtering={filtering}>
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
      <Facet attribute="clinical_outcome_extracted_" title="Clinical Outcome" />
      <Facet
        attribute="surrogate_outcome_extracted_"
        title="Surrogate Outcome"
      />
      <Facet attribute="study_type" title="Study Type" showMore />
      <Facet attribute="countries" title="Countries" />
      <Footer>
        <StyledSeeTrialsButton onClick={closeFiltering} />
      </Footer>
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
  padding: 16px 16px 80px 16px;
  border: 1px solid ${colors.Border};
  box-sizing: border-box;
  border-radius: 4px;

  h1 {
    font-size: 18px;
    font-weight: normal;
    margin: 0;
  }

  display: ${({ filtering }) => (filtering ? undefined : "none")};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  @media ${devices.Desktop} {
    display: initial;
    position: initial;
    top: auto;
    left: auto;
    width: auto;
    z-index: 0;
    margin-bottom: 8px;
    margin-right: 32px;
    padding: 16px;
  }
`;

const Header = styled.div`
  color: ${colors.DefaultText};
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  align-items: flex-end;
  font-size: 14px;
  line-height: 24px;
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

const formatTrialsString = (nbHits: number) =>
  nbHits === 1 ? "1 trial" : `${nbHits} trials`;
const SeeTrialsButton = connectStats(
  ({
    nbHits,
    onClick,
    className
  }: {
    nbHits: number;
    onClick: () => void;
    className?: string;
  }) => (
    <Button onClick={onClick} className={className}>
      See {formatTrialsString(nbHits)}
    </Button>
  )
);
const StyledSeeTrialsButton = styled(SeeTrialsButton)`
  padding: 0 24px;
`;
