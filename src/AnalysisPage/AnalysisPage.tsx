import React from "react";
import styled from "styled-components";
import TableauReport from "tableau-react";

import { devices } from "../ui";

import { Disclaimer } from "./Disclaimer";
import { CTAFooter } from "./CTAFooter";
import { Introduction } from "./Introduction";

const TableauURL =
  "https://public.tableau.com/views/Who_15849588323430/ClinicalResearchforCOVID-19";

export const AnalysisPage = () => (
  <Container>
    <Introduction />
    <TableauReport url={TableauURL} />
    <StyledCTAFooter />
    <Disclaimer />
  </Container>
);

const Container = styled.div`
  padding: 32px;

  > div:not(:last-child) {
    margin-bottom: 16px;
  }
  > div {
    border-radius: 4px;
  }

  @media ${devices.Desktop} {
    padding: 32px 120px;
  }
`;

const StyledCTAFooter = styled(CTAFooter)`
  margin-top: 16px;
`;
