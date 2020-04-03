import React from "react";
import styled from "styled-components";

import { devices, linkCss, BookmarkIcon, NavigationOutIcon } from "../../ui";

import { ClinicalTrialHitPublication } from "./ClinicalTrialHit";

const StyledNavigationOutIcon = styled(NavigationOutIcon)`
  visibility: hidden;
  margin-left: 6px;
  vertical-align: text-bottom;

  @media ${devices.Desktop} {
    padding-top: 3px;
  }

  @media ${devices.Touchable} {
    visibility: visible;
  }
`;

const PublicationContainer = styled.div`
  display: flex;
  :not(:last-child) {
    margin-bottom: 8px;
  }

  @media ${devices.Desktop} {
    :not(:last-child) {
      margin-bottom: 4px;
    }
  }
`;

const StyledBookmarkIcon = styled(BookmarkIcon)`
  margin-right: 8px;
  flex-shrink: 0;
  padding-top: 3px;
`;

const PublicationLink = styled.a`
  text-decoration: none;
  @media ${devices.Desktop} {
    display: flex;
  }
  &:hover {
    ${StyledNavigationOutIcon} {
      visibility: visible;
    }
  }
`;

const EllipsisContent = styled.span`
  ${linkCss};
  @media ${devices.Desktop} {
    max-width: 575px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
  }
`;

export const Publication = ({
  publication
}: {
  publication: ClinicalTrialHitPublication;
}) => (
  <PublicationContainer key={publication.url}>
    <StyledBookmarkIcon />
    <PublicationLink
      href={publication.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <EllipsisContent>{publication.title || publication.url}</EllipsisContent>
      <StyledNavigationOutIcon />
    </PublicationLink>
  </PublicationContainer>
);
