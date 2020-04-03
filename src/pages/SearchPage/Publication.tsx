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
  padding-bottom: 3px;
  border-bottom: 1px solid ${colors.Primary};
  &:hover {
    border-bottom-color: ${colors.DefaultTextHover};
    color: ${colors.PrimaryHover};
  }

  @media ${devices.Desktop} {
    max-width: 575px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;

    padding-bottom: 0;
    border-bottom: 0;

    &:hover,
    &:focus {
      cursor: pointer;
      color: ${colors.PrimaryHover};
    }

    &::after {
      content: "";
      display: block;
      margin-top: -1px;
      border-bottom: 1px solid ${colors.Primary};
      width: 100%;
    }

    &:hover::after {
      content: "";
      width: 100%;
      border-bottom-color: ${colors.DefaultTextHover};
      animation: increase-width 0.3s;
    }

    @keyframes increase-width {
      0% {
        width: 0;
      }
      100% {
        width: 100%;
      }
    }
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
