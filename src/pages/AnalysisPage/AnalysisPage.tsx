import React from "react";
import styled from "styled-components";
import TableauReport from "tableau-react";

import {
  Disclaimer,
  CTAFooter,
  SendUsFeedbackCard,
  devices,
  colors
} from "../../ui";
import { useBoolean } from "../../hooks";
import config from "../../config";

import { Introduction } from "./Introduction";
import { Title } from "./Title";

export const AnalysisPage = () => {
  const {
    setToTrue: displayTableauTitle,
    isTrue: isTableauTitleDisplayed
  } = useBoolean(false);

  return (
    <Container>
      <Introduction />
      <TableauContainer>
        {isTableauTitleDisplayed && (
          <StyledTitle>
            Clinical research for <UnbreakableWord>Covid-19</UnbreakableWord>
          </StyledTitle>
        )}

        <TableauReport
          url={config.TableauUrl}
          options={{
            width: "100%",
            height: "100%",
            onFirstVizSizeKnown: displayTableauTitle
          }}
        />
      </TableauContainer>
      <StyledSendUsFeedbackCard />
      <StyledCTAFooter />
      <Disclaimer />
    </Container>
  );
};

const Container = styled.div`
  padding: 32px 16px;
  max-width: 1200px;
  margin: auto;

  > div:not(:last-child) {
    margin-bottom: 16px;
  }
  > div {
    border-radius: 4px;
  }
`;

const TableauContainer = styled.div`
  > div {
    height: 827px;
  }
`;

const StyledTitle = styled(Title)`
  background-color: ${colors.SecondaryBackground};
  margin: 0;
  padding: 16px 16px 0 16px;

  @media ${devices.Desktop} {
    padding: 16px 32px 0 32px;
  }
`;

const UnbreakableWord = styled.span`
  white-space: nowrap;
`;

const StyledSendUsFeedbackCard = styled(SendUsFeedbackCard)`
  margin-top: 16px;

  @media ${devices.Desktop} {
    display: none;
  }
`;

const StyledCTAFooter = styled(CTAFooter)`
  margin-top: 16px;
`;
