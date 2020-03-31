import React from "react";
import styled from "styled-components";

import { colors, devices } from "../../ui";

import {
  TrialStatus,
  TherapeuticClasses,
  RegistrationDate,
  TargetedPatients,
  Countries
} from "./HitHighlight";

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
  };
}

export const ClinicalTrialHit = ({
  hit: {
    public_title,
    web_address,
    recruitment_status,
    therapeutic_classes,
    date_registration3,
    objectID,
    acronym,
    total_recruitment_size,
    countries
  }
}: any) => (
  <Link href={web_address} target="_blank">
    <Container>
      <LeftContainer>
        {objectID}
        <TitleContainer>
          <Title>{public_title}</Title> <Acronym>{acronym}</Acronym>
        </TitleContainer>
      </LeftContainer>
      <RightContainer>
        <RegistrationDate registrationDate={date_registration3} />
        <TrialStatus value={recruitment_status} />
        <TargetedPatients targetedPatientsNumber={total_recruitment_size} />
        {countries.length > 0 && <Countries countries={countries} />}
        <TherapeuticClasses value={therapeutic_classes} />
      </RightContainer>
    </Container>
  </Link>
);

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

const LeftContainer = styled.div`
  margin-right: 64px;

  @media ${devices.Desktop} {
    width: 600px;
    min-width: 600px;
  }
`;

const Link = styled.a`
  text-decoration: none;
`;
