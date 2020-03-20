import React from "react";
import { RefinementList } from "react-instantsearch-dom";
import styled from "styled-components";

import { colors } from "../ui";

export const Facets = () => {
  return (
    <FacetsContainer>
      <Facet attribute="countries" title="Countries" />
      <Facet attribute="recruitment_status" title="Recruitment Status" />
      <Facet attribute="study_type" title="Study Type" showMore />
      <Facet
        attribute="therapeutic_classes"
        title="Therapeutic Classes"
        searchable
        showMore
      />
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
        showMoreLimit={50}
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
    font-size: 16px;
    font-weight: normal;
    color: ${colors.SecondaryText};
    text-transform: uppercase;
  }

  .ais-RefinementList-item {
    font-size: 14px;
  }
`;

const FacetsContainer = styled.div`
  align-self: flex-start;
  min-width: 265px;
  background: ${colors.SecondaryBackground};
  padding: 16px;
  margin-right: 32px;
  margin-bottom: 8px;
  border: 1px solid ${colors.Border};
  box-sizing: border-box;
  border-radius: 4px;
`;
