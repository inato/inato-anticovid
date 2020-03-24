import React from "react";
import styled from "styled-components";
import TableauReport from "tableau-react";

import { device } from "../ui";

import { Disclaimer } from "./Disclaimer";

const TableauURL =
  "https://public.tableau.com/views/Who_15849588323430/ClinicalResearchforCOVID-19";

export const OverviewPage = () => (
  <Container>
    <TableauReport url={TableauURL} />
    <Disclaimer />
  </Container>
);

const Container = styled.div`
  padding: 32px;

  @media ${device.sm} {
    padding: 32px 120px;
  }
`;
