import React from "react";
import styled from "styled-components";
import TableauReport from "tableau-react";

const TableauURL =
  "https://public.tableau.com/views/Who_15849588323430/ClinicalResearchforCOVID-19";

export const OverviewPage = () => (
  <Container>
    <TableauReport url={TableauURL} />
  </Container>
);

const Container = styled.div`
  height: 100vh;
  padding: 32px 120px;
`;
