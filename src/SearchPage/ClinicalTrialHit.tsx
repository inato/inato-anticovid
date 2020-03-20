import React from "react";
import styled from "styled-components";

import { colors } from "../ui";

interface ClinicalTrialHit {
  hit: {
    public_title: string;
    intervention: string;
    web_address: string;
  };
}

export const ClinicalTrialHit = ({
  hit: { public_title, web_address }
}: any) => (
  <Container>
    <Link href={web_address} target="_blank">
      {public_title}
    </Link>
  </Container>
);

const Container = styled.div`
  background: ${colors.SecondaryBackground};
  padding: 16px;
`;

const Link = styled.a`
  text-decoration: none;
`;
