import React from "react";
import styled from "styled-components";

import { colors } from "../ui";
import { Space, Orientation } from "../ui/components";

import {
  TrialStatus,
  TherapeuticClasses,
  RegistrationDate
} from "./HitHighlight";

interface ClinicalTrialHit {
  hit: {
    public_title: string;
    intervention: string;
    web_address: string;
    recruitment_status: string;
    therapeutic_classes: Array<string>;
    study_type: string;
    date_registration3: string;
    ethics_review_status: string | null;
  };
}

export const ClinicalTrialHit = ({
  hit: {
    public_title,
    web_address,
    recruitment_status,
    therapeutic_classes,
    study_type,
    date_registration3,
    ethics_review_status
  }
}: any) => (
  <Link href={web_address} target="_blank">
    <Container>
      <TitleContainer>{public_title}</TitleContainer>
      <RightContainer>
        <RegistrationDate registrationDate={date_registration3} />
        <TrialStatus value={recruitment_status} />
        <Space size={48} orientation={Orientation.horizontal} />
        <TherapeuticClasses value={therapeutic_classes} />
      </RightContainer>
    </Container>
  </Link>
);

const Container = styled.div`
  :hover {
    background-color: ${colors.LightGreyBackground};
    cursor: pointer;
    box-shadow: 0 2px 5px 0px ${colors.BoxShadow};
  }
  background-color: ${colors.SecondaryBackground};
  border: 1px solid ${colors.Border};
  border-radius: 4px;
  padding: 16px;
  flex-direction: row;
  display: flex;
  align-items: center;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  width: 600px;
  min-width: 600px;
  color: ${colors.DefaultText};
  margin-right: 60px;
  font-size: 16px;
  font-weight: 500;
`;

const Link = styled.a`
  text-decoration: none;
`;
