import React from "react";
import styled from "styled-components";

import { colors, Space, Orientation } from "../ui";

export const TrialStatus = ({ value }: { value: string }) => (
  <HitHighlightContainer>
    <Title>trial status</Title>
    <div style={{ display: "flex" }}>
      {value === "Recruiting" && (
        <>
          <GreenDot />
          <Space size={8} orientation={Orientation.horizontal} />
        </>
      )}
      <Value>{value}</Value>
    </div>
  </HitHighlightContainer>
);

const GreenDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${colors.GreenDot};
  border-radius: 4px;
  align-self: center;
`;

export const TherapeuticClasses = ({ value }: { value: Array<string> }) => {
  const classes = (
    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
      {value.map(therapeuticClass => (
        <li key={therapeuticClass}>{therapeuticClass}</li>
      ))}
    </ul>
  );
  return (
    <HitHighlightContainer>
      <Title>Therapeutic Class</Title>
      <Value>{classes}</Value>
    </HitHighlightContainer>
  );
};

export const StudyType = ({ value }: { value: string }) => (
  <HitHighlightContainer>
    <Title>study type</Title>
    <Value>{value}</Value>
  </HitHighlightContainer>
);

const HitHighlightContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 12px;
  line-height: 20px;
  text-transform: uppercase;
  color: ${colors.GreySecondaryText};
`;

const Value = styled.span`
  line-height: 24px;
  font-size: 14px;
  color: ${colors.DefaultText};
`;
