import React from "react";
import styled from "styled-components";

import { colors, devices } from "../ui";

import {
  TrialStatus,
  TherapeuticClasses,
  RegistrationDate
} from "./HitHighlight";

interface ClinicalTrialHit {
  hit: {
    public_title: string;
    web_address: string;
    recruitment_status: string | null;
    therapeutic_classes: Array<string>;
    date_registration3: string;
  };
}

export const ClinicalTrialHit = ({
  hit: {
    public_title,
    web_address,
    recruitment_status,
    therapeutic_classes,
    date_registration3
  }
}: any) => (
  <Link href={web_address} target="_blank">
    <Container>
      <TitleContainer>{public_title}</TitleContainer>
      <RightContainer>
        <RegistrationDate registrationDate={date_registration3} />
        <TrialStatus value={recruitment_status} />
        <TherapeuticClasses value={therapeutic_classes} />
      </RightContainer>
    </Container>
  </Link>
);

const Container = styled.div`
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
  color: ${colors.DefaultText};
  margin-right: 64px;
  font-size: 16px;
  font-weight: 500;

  @media ${devices.Desktop} {
    width: 600px;
    min-width: 600px;
  }
`;

const Link = styled.a`
  text-decoration: none;
`;
