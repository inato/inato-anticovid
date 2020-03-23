import React from "react";
import styled from "styled-components";

import { colors, Space, Orientation } from "../ui";

export const TrialStatus = ({ value }: { value: string }) => (
  <HitHighlightContainer>
    {value === "Recruiting" ? <GreenDot /> : <GrayDot />}
    <Space size={8} orientation={Orientation.horizontal} />
    {value}
  </HitHighlightContainer>
);

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  align-self: center;
`;

const GreenDot = styled(Dot)`
  background-color: ${colors.GreenDot};
`;

const GrayDot = styled(Dot)`
  background-color: ${colors.GrayDot};
`;

export const TherapeuticClasses = ({ value }: { value: Array<string> }) => {
  return (
    <TherapeuticClassesContainer>
      {value
        .filter(therapeuticClass => therapeuticClass)
        .map(therapeuticClass => (
          <TherapeuticClass key={therapeuticClass}>
            {therapeuticClass}
          </TherapeuticClass>
        ))}
    </TherapeuticClassesContainer>
  );
};

const TherapeuticClass = styled.span`
  border-radius: 4px;
  padding: 2px 8px;
  background: #eaedf1;
  white-space: nowrap;
  margin: 4px 4px 4px 0;
`;

const HitHighlightContainer = styled.div`
  display: flex;
  color: ${colors.GreySecondaryText};
  font-size: 12px;
  line-height: 20px;
`;

const TherapeuticClassesContainer = styled(HitHighlightContainer)`
  flex-wrap: wrap;
`;
