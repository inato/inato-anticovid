import React from "react";
import styled from "styled-components";
import TableauReport from "tableau-react";

import { Disclaimer, CTAFooter, SendUsFeedbackCard, devices } from "../../ui";

import { Introduction } from "./Introduction";

const TableauURL =
  "https://public.tableau.com/views/Who_15849588323430/ClinicalResearchforCOVID-19";

export const AnalysisPage = () => (
  <Container>
    <Introduction />
    <TableauReport url={TableauURL} />
    <StyledSendUsFeedbackCard />
    <StyledCTAFooter />
    <Disclaimer />
  </Container>
);

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

const StyledSendUsFeedbackCard = styled(SendUsFeedbackCard)`
  margin-top: 16px;

  @media ${devices.Desktop} {
    display: none;
  }
`;

const StyledCTAFooter = styled(CTAFooter)`
  margin-top: 16px;
`;
