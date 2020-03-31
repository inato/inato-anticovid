import React from "react";
import styled from "styled-components";

import { devices, colors, BookmarkIcon } from "../../ui";

import { ClinicalTrialHitPublication } from "./ClinicalTrialHit";

const PublicationLink = styled.a`
  display: flex;
  :not(:first-child) {
    margin-top: 4px;
  }

  @media ${devices.Desktop} {
    :not(:first-child) {
      margin-top: 0;
    }
  }
`;

const StyledBookmarkIcon = styled(BookmarkIcon)`
  margin-right: 8px;
  flex-shrink: 0;
  margin-top: 3px;
`;

const PublicationTitle = styled.a`
  color: ${colors.Primary};
  @media ${devices.Desktop} {
    max-width: 575px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const Publication = ({
  publication
}: {
  publication: ClinicalTrialHitPublication;
}) => (
  <PublicationLink
    key={publication.url}
    href={publication.url}
    target="_blank"
    rel="noopener noreferrer"
  >
    <StyledBookmarkIcon />
    <PublicationTitle>{publication.title || publication.url}</PublicationTitle>
  </PublicationLink>
);
