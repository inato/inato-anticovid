import React from "react";
import styled from "styled-components";

import { colors } from "../ui";
import { Space, Orientation } from "../ui/components";

import { TrialStatus, TherapeuticClasses, StudyType } from "./HitHighlight";

interface ClinicalTrialHit {
  hit: {
    public_title: string;
    intervention: string;
    web_address: string;
    recruitment_status: string;
    therapeutic_classes: Array<string>;
    study_type: string;
  };
}

export const ClinicalTrialHit = ({
  hit: {
    public_title,
    web_address,
    recruitment_status,
    therapeutic_classes,
    study_type
  }
}: any) => (
  <Container>
    <TitleContainer>
      <Link href={web_address} target="_blank">
        {public_title}
      </Link>
    </TitleContainer>
    <Space size={8} orientation={Orientation.vertical} />
    <Highlights>
      <TrialStatus value={recruitment_status} />
      <Space size={24} orientation={Orientation.horizontal} />
      <TherapeuticClasses value={therapeutic_classes} />
      <Space size={24} orientation={Orientation.horizontal} />
      <StudyType value={study_type} />
    </Highlights>
  </Container>
);

const Container = styled.div`
  background: ${colors.SecondaryBackground};
  border: 1px solid ${colors.Border};
  border-radius: 4px;
  padding: 16px;
`;

const TitleContainer = styled.div`
  max-width: 600px;
`;

const Link = styled.a`
  text-decoration: none;
  color: ${colors.DefaultText};
`;

const Highlights = styled.div`
  display: flex;
  flex-direction: row;
`;
