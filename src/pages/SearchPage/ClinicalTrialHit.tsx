import React from "react";
import styled from "styled-components";

import { colors, devices } from "../../ui";

import {
  TrialStatus,
  TherapeuticClasses,
  TargetedPatients,
  Countries,
  RegistrationDate,
  Outcome
} from "./HitHighlight";

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
    surrogate_outcome_extracted_
  }
}: any) => {
  const publications = [
    {
      title:
        "This is an example of a very long result publication title where you could have a Carama eiuo a sjdfoi",
      url: "http://tata"
    }
  ];

  return (
    <Link href={web_address} target="_blank">
      <Container>
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
        <PublicationContainer>{publications[0].title}</PublicationContainer>
      </Container>
    </Link>
  );
};
const Container = styled.div`
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

const PublicationContainer = styled.div``;
