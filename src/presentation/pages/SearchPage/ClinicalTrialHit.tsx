import React from 'react';
import styled, { css } from 'styled-components';
import { Highlight } from 'react-instantsearch-dom';

import { colors, devices, NavigationOutIcon } from '../../ui';

import {
  TrialStatus,
  TherapeuticClasses,
  TargetedPatients,
  Countries,
  RegistrationDate,
  Outcome,
} from './HitHighlight';
import { Publication } from './Publication';
import { Acronym, ClinicalTrialPublicTitle } from './ClinicalTrialPublicTitle';

export interface ClinicalTrialHitPublication {
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
    objectID: string;
    acronym: string | null;
    total_recruitment_size: number;
    countries: Array<string>;
    clinical_outcome_extracted_: Array<string>;
    surrogate_outcome_extracted_: Array<string>;
    results_publications?: Array<ClinicalTrialHitPublication>;
  };
}

const Container = styled.div<{ hasPublications: boolean }>`
  color: ${colors.GreySecondaryText};
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
        margin-bottom: 16px;
      }
      border-left: 4px solid ${colors.Primary};
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

const LeftContainer = styled.div`
  margin-bottom: 16px;
  width: 100%; /* For IE11 */
  @media ${devices.Desktop} {
    width: 600px;
    min-width: 600px;
    margin-right: 64px;
    margin-bottom: 0;
  }
`;

const TitleContainer = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

export const StyledNavigationOutIcon = styled(NavigationOutIcon)`
  visibility: hidden;
  margin-left: 6px;
  vertical-align: text-top;

  @media ${devices.Touchable} {
    visibility: visible;
  }
`;

const Link = styled.a`
  text-decoration: none;
  color: ${colors.Primary};
  &:hover {
    color: ${colors.PrimaryHover};
    ${Acronym} {
      color: ${colors.PrimaryHover};
    }
    ${StyledNavigationOutIcon} {
      visibility: visible;
    }
  }
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

const PublicationsContainer = styled.div`
  margin-top: 16px;
  @media ${devices.Desktop} {
    margin-top: 0;
  }
`;

const PublicationsTitle = styled.div`
  font-size: 12px;
`;

export const ClinicalTrialHit = ({ hit }: { hit: any }) => {
  const {
    web_address,
    recruitment_status,
    date_registration3,
    total_recruitment_size,
    countries,
    clinical_outcome_extracted_,
    surrogate_outcome_extracted_,
    results_publications,
  } = hit;

  return (
    <Container
      hasPublications={results_publications && results_publications.length > 0}
    >
      <TopContainer>
        <LeftContainer>
          <Highlight attribute="trialid" hit={hit} />
          <TitleContainer>
            <Link href={web_address} target="_blank">
              <ClinicalTrialPublicTitle hit={hit} />
            </Link>
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
          <TherapeuticClasses hit={hit} attribute="therapeutic_classes" />
        </RightContainer>
      </TopContainer>
      {results_publications && results_publications.length > 0 && (
        <PublicationsContainer>
          <PublicationsTitle>Result publications</PublicationsTitle>

          {results_publications.map(
            (publication: ClinicalTrialHitPublication) => (
              <Publication publication={publication} key={publication.url} />
            ),
          )}
        </PublicationsContainer>
      )}
    </Container>
  );
};
