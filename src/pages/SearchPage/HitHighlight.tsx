import React from "react";
import styled from "styled-components";
import { format } from "date-fns";

import {
  colors,
  devices,
  PatientsIcon,
  EarthIcon,
  TimeClockIcon,
  MedicalKitIcon
} from "../../ui";

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
          <TherapeuticClass key={therapeuticClass} title={therapeuticClass}>
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
      <TimeClockIcon />
      <RegistrationDateText>Registered on {formattedDate}</RegistrationDateText>
    </HitHighlightContainer>
  );
};

const RegistrationDateText = styled.span`
  width: 162px;
`;

const EllipsisStyledText = styled.span`
  max-width: 212px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TargetedPatients = ({
  targetedPatientsNumber
}: {
  targetedPatientsNumber: number;
}) => {
  return (
    <HitHighlightContainer>
      <PatientsIcon />
      {targetedPatientsNumber} patients targeted
    </HitHighlightContainer>
  );
};

export const Countries = ({ countries }: { countries: Array<string> }) => {
  if (countries.length === 0) {
    return null;
  }

  const countriesToDisplay = countries.join(", ");
  return (
    <HitHighlightContainer>
      <EarthIcon />
      <EllipsisStyledText title={countriesToDisplay}>
        {countriesToDisplay}
      </EllipsisStyledText>
    </HitHighlightContainer>
  );
};

interface OutcomeProps {
  hasClinicalOutcome: boolean;
  hasSurrogateOutcome: boolean;
}

const getOutcomeLabelsToDisplay = ({
  hasClinicalOutcome,
  hasSurrogateOutcome
}: OutcomeProps) => {
  if (!hasClinicalOutcome && !hasSurrogateOutcome) {
    return [];
  }
  const outcomes = hasClinicalOutcome ? ["Clinical outcome"] : [];
  if (hasSurrogateOutcome) {
    outcomes.push(
      outcomes.length > 0 ? "surrogate outcome" : "Surrogate outcome"
    );
  }
  return outcomes;
};

export const Outcome = (props: OutcomeProps) => {
  const outcomes = getOutcomeLabelsToDisplay(props);
  return outcomes.length === 0 ? null : (
    <HitHighlightContainer>
      <MedicalKitIcon />
      {outcomes.join(", ")}
    </HitHighlightContainer>
  );
};

const HitHighlightContainer = styled.div`
  display: flex;
  font-size: 12px;
  line-height: 20px;
  align-items: center;

  svg {
    margin-right: 4px;
  }
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin-right: 4px;
`;

const GreenDot = styled(Dot)`
  background-color: ${colors.GreenDot};
`;

const GrayDot = styled(Dot)`
  background-color: ${colors.GreyBackground};
`;

const TherapeuticClass = styled.span`
  border-radius: 4px;
  padding: 2px 8px;
  background: #eaedf1;
  white-space: nowrap;
  margin: 4px 4px 0 0;

  @media ${devices.Desktop} {
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const TherapeuticClassesContainer = styled(HitHighlightContainer)`
  flex-wrap: wrap;
  max-width: 205px; /* for IE11 */
`;
