import React from "react";
import styled, { css } from "styled-components";

import { colors, devices, BookmarkIcon } from "../../ui";

import {
  TrialStatus,
  TherapeuticClasses,
  TargetedPatients,
  Countries,
  RegistrationDate,
  Outcome
} from "./HitHighlight";

interface Publication {
  title?: string;
  url: string;
}
interface ClinicalTrialHit {
  hit: {
    public_title: string;
    web_address: string;
    recruitment_status: string | null;
    therapeutic_classes: Array<string>;
    date_registration3: string;
    trialid: string;
    acronym: string | null;
    total_recruitment_size: number;
    countries: Array<string>;
    clinical_outcome_extracted_: Array<string>;
    surrogate_outcome_extracted_: Array<string>;
    results_publications: Array<Publication>;
  };
}

export const ClinicalTrialHit = ({
  hit: {
    public_title,
    web_address,
    recruitment_status,
    therapeutic_classes,
    date_registration3,
    trialid,
    acronym,
    total_recruitment_size,
    countries,
    clinical_outcome_extracted_,
    surrogate_outcome_extracted_,
    results_publications
  }
}: any) => (
  <Link href={web_address} target="_blank">
    <Container hasPublications={results_publications.length > 0}>
      <TopContainer>
        <LeftContainer>
          {trialid}
          <TitleContainer>
            <Title>{public_title}</Title> <Acronym>{acronym}</Acronym>
          </TitleContainer>
          <RegistrationAndOutcomeContainer>
            <RegistrationDate registrationDate={date_registration3} />
            <Outcome
              hasClinicalOutcome={clinical_outcome_extracted_.length > 0}
              hasSurrogateOutcome={surrogate_outcome_extracted_.length > 0}
            />
          </RegistrationAndOutcomeContainer>
        </LeftContainer>
        <RightContainer>
          <TrialStatus value={recruitment_status} />
          <TargetedPatients targetedPatientsNumber={total_recruitment_size} />
          <Countries countries={countries} />
          <TherapeuticClasses value={therapeutic_classes} />
        </RightContainer>
      </TopContainer>
      {results_publications.length > 0 && (
        <PublicationsContainer>
          <PublicationsTitle>Result publications</PublicationsTitle>

          {results_publications.map((publication: Publication) => (
            <PublicationLink
              key={publication.url}
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledBookmarkIcon />
              <PublicationTitle>
                {publication.title || publication.url}
              </PublicationTitle>
            </PublicationLink>
          ))}
        </PublicationsContainer>
      )}
    </Container>
  </Link>
);

const PublicationsTitle = styled.div`
  font-size: 12px;
`;

const Container = styled.div<{ hasPublications: boolean }>`
  color: ${colors.GreySecondaryText};
  &:hover {
    background-color: ${colors.LightGreyBackground};
    cursor: pointer;

    transform: scale(1.002);
    transition-duration: 100ms;
    box-shadow: hsla(0, 0%, 94%, 1) 4px 4px 6px 0px;
  }
  background-color: ${colors.SecondaryBackground};
  border: 1px solid ${colors.Border};
  border-radius: 4px;
  padding: 16px;

  display: flex;
  flex-direction: column;
  ${({ hasPublications }) =>
    hasPublications &&
    css`
      min-height: 144px;
      justify-content: space-between;
      ${LeftContainer} {
        margin-bottom: 15px;
      }
    `}
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media ${devices.Desktop} {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  > div:not(:last-child) {
    margin-top: 4px;
  }
  @media ${devices.Desktop} {
    > div:not(:last-child):not(:first-child) {
      margin-top: 4px;
    }
  }
`;

const TitleContainer = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const Title = styled.span`
  color: ${colors.DarkGray};
`;

const Acronym = styled.span`
  white-space: nowrap;
`;

const RegistrationAndOutcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    margin-top: 5px;
  }

  @media ${devices.Desktop} {
    flex-direction: row;
    margin-top: 2px;
    > div {
      margin-top: 0;
    }
  }
`;

const LeftContainer = styled.div`
  @media ${devices.Desktop} {
    width: 600px;
    min-width: 600px;
    margin-right: 64px;
  }
`;

const Link = styled.a`
  text-decoration: none;
`;

const PublicationsContainer = styled.div`
  margin-top: 18px;
  @media ${devices.Desktop} {
    margin-top: 0;
  }
`;

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

const PublicationTitle = styled.a`
  color: ${colors.Primary};
  @media ${devices.Desktop} {
    max-width: 575px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const StyledBookmarkIcon = styled(BookmarkIcon)`
  margin-right: 8px;
  flex-shrink: 0;
  margin-top: 3px;
`;
