import React from "react";
import styled from "styled-components";

import { colors } from "./colors";
import { AlgoliaIcon } from "./icons/AlgoliaLogo";

const StyledAlgoliaIcon = styled(AlgoliaIcon)`
  height: 16px;
  width: 57px;
  margin-left: 5px;
`;

const PoweredByContainer = styled.div`
  display: flex;
  align-items: center;
`;
const PoweredByText = styled.span`
  color: ${colors.GreySecondaryText};
  font-size: 12px;
`;
const PoweredByLink = styled.a`
  display: flex;
`;

export const PoweredByAlgolia = ({ className }: { className?: string }) => (
  <PoweredByContainer className={`ais-PoweredBy ${className}`}>
    <PoweredByText className="ais-PoweredBy-text">
      Search powered by
    </PoweredByText>
    <PoweredByLink
      href="https://www.algolia.com/?utm_source=instantsearch.js&utm_medium=website&utm_content=anticovid.inato.com&utm_campaign=poweredby"
      className="ais-PoweredBy-link"
      aria-label="Algolia"
    >
      <StyledAlgoliaIcon />
    </PoweredByLink>
  </PoweredByContainer>
);
