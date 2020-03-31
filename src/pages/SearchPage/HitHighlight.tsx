import React from "react";
import styled from "styled-components";
import { format } from "date-fns";

import { colors, TimeClockIcon, PatientsIcon, EarthIcon } from "../../ui";

export const TrialStatus = ({ value }: { value: string | null }) => (
  <HitHighlightContainer>
    {value === "Recruiting" ? <GreenDot /> : <GrayDot />}
    {value !== null ? value : "N/A"}
  </HitHighlightContainer>
);

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

export const RegistrationDate = ({
  registrationDate
}: {
  registrationDate: string;
}) => {
  const formattedDate = format(new Date(registrationDate), "MMM dd yyyy");
  return (
    <HitHighlightContainer>
      <StyledTimeClockIcon />
      Registered on {formattedDate}
    </HitHighlightContainer>
  );
};

export const TargetedPatients = ({
  targetedPatientsNumber
}: {
  targetedPatientsNumber: number;
}) => {
  return (
    <HitHighlightContainer>
      <StyledPatientsIcon />
      {targetedPatientsNumber} patiens targeted
    </HitHighlightContainer>
  );
};

export const Countries = ({ countries }: { countries: Array<string> }) => {
  return (
    <HitHighlightContainer>
      <StyledEarthIcon />
      {countries.join(", ")}
    </HitHighlightContainer>
  );
};

const HitHighlightContainer = styled.div`
  display: flex;
  font-size: 12px;
  line-height: 20px;
  align-items: center;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin-right: 8px;
`;

const GreenDot = styled(Dot)`
  background-color: ${colors.GreenDot};
`;

const GrayDot = styled(Dot)`
  background-color: ${colors.GreyBackground};
`;

const StyledTimeClockIcon = styled(TimeClockIcon)`
  margin-right: 8px;
`;

const StyledPatientsIcon = styled(PatientsIcon)`
  margin-right: 8px;
`;

const StyledEarthIcon = styled(EarthIcon)`
  margin-right: 8px;
`;

const TherapeuticClass = styled.span`
  border-radius: 4px;
  padding: 2px 8px;
  background: #eaedf1;
  white-space: nowrap;
  margin: 4px 4px 0 0;
`;

const TherapeuticClassesContainer = styled(HitHighlightContainer)`
  flex-wrap: wrap;
  max-width: 205px; /* for IE11 */
`;
