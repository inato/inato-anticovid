import React from "react";
import styled from "styled-components";

import { devices, colors, BookmarkIcon, NavigationOutIcon } from "../../ui";

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

const PublicationLink = styled.a`
  text-decoration: none;
  display: flex;
  :not(:first-child) {
    margin-top: 4px;
  }

  @media ${devices.Desktop} {
    :not(:first-child) {
      margin-top: 0;
    }
  }

  &:hover {
    ${StyledNavigationOutIcon} {
      visibility: visible;
    }
  }
`;

const StyledBookmarkIcon = styled(BookmarkIcon)`
  margin-right: 8px;
  flex-shrink: 0;
  padding-top: 3px;
`;

const PublicationTitle = styled.span`
  color: ${colors.Primary};
  @media ${devices.Desktop} {
    display: flex;
  }
`;

const EllipsisContent = styled.span`
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
  <PublicationLink
    key={publication.url}
    href={publication.url}
    target="_blank"
    rel="noopener noreferrer"
  >
    <StyledBookmarkIcon />
    <PublicationTitle>
      <EllipsisContent>{publication.title || publication.url}</EllipsisContent>
      <StyledNavigationOutIcon />
    </PublicationTitle>
  </PublicationLink>
);
