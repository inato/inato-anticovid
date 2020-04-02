import React from "react";
import styled from "styled-components";

import { colors } from "../../ui";
import { splitSentenceByLastWord } from "../../utils/splitSentenceByLastWord";

import { StyledNavigationOutIcon } from "./ClinicalTrialHit";

export const Acronym = styled.span`
  color: ${colors.GreySecondaryText};
  white-space: nowrap;
`;

const UnbreakableWord = styled.span`
  white-space: nowrap;
`;

export const ClinicalTrialPublicTitle = ({
  publicTitle,
  acronym
}: {
  publicTitle: string;
  acronym: string | null;
}) => {
  if (!acronym) {
    const [titleFirstPart, titleLastWord] = splitSentenceByLastWord(
      publicTitle
    );

    return (
      <>
        {titleFirstPart}{" "}
        <UnbreakableWord>
          {titleLastWord}
          <StyledNavigationOutIcon />
        </UnbreakableWord>
      </>
    );
  }

  return (
    <>
      {publicTitle}{" "}
      <Acronym>
        {acronym}
        <StyledNavigationOutIcon />
      </Acronym>
    </>
  );
};
