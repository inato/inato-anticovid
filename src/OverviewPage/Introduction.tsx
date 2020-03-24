import React from "react";
import styled from "styled-components";

import { colors, fontSize, fontWeight, lineHeight } from "../ui";

export const Introduction = () => (
  <Container>
    <Title>What is Anticovid?</Title>
    <Paragraph>
      Anticovid is an open access platform gathering virtually all available
      information in a transparent manner regarding clinical research worldwide
      against SARS-CoV 2 (which is the virus responsible for COVID-19)
    </Paragraph>
    <Paragraph>
      The purpose of Anticovid is to help the global healthcare community to get
      access to the needed information in a comprehensive way, especially given
      that the landscape is evolving at an unprecedented pace. This is critical
      to optimize resource allocation and address unmet needs as fast as
      possible.
    </Paragraph>
  </Container>
);

const Container = styled.div`
  background: ${colors.SecondaryBackground};
  border-left: 8px solid ${colors.GreySecondaryText};
  color: ${colors.DefaultText};
  display: flex;
  flex-direction: column;
  padding: 16px 32px;
`;

const Title = styled.h1`
  font-size: ${fontSize.Big};
  font-weight: ${fontWeight.Bold};
  line-height: ${lineHeight.Big};
  margin: 0 0 4px 0;
`;

const Paragraph = styled.p`
  margin: 4px 0 0 0;
`;
