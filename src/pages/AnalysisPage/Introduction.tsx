import React from "react";
import styled from "styled-components";

import { colors, fontSize, fontWeight, lineHeight, devices } from "../../ui";

import { Accordion } from "./Accordion";

export const Introduction = () => (
  <Container>
    <Title>What is Anticovid?</Title>
    <Paragraph>
      Anticovid is an open-access platform gathering all available information
      on clinical research worldwide against SARS-CoV 2 (the virus responsible
      for COVID-19)
    </Paragraph>
    <Paragraph>
      The purpose of Anticovid is to provide access to helpful information to
      the global healthcare community, in a constantly evolving landscape. We
      believe this is critical to optimize resource allocation and address unmet
      needs as fast as possible
    </Paragraph>
    <Accordion title="Where the data comes from">
      <Paragraph>
        Most of the data comes from public sources that are duly cited in the
        dedicated section of the website. Data is updated every day.
      </Paragraph>
      <Paragraph>
        Anticovid will soon enhance its content with high quality data in
        particular from clinical investigators around the globe that are
        committed to support research against SARS-CoV 2, as well as
        pharmaceutical manufacturers already engaged or about to do so in
        vaccine or therapeutic trials.
      </Paragraph>
    </Accordion>
    <Accordion title="Who we are">
      <Paragraph>
        Anticovid is provided by{" "}
        <a href="https://inato.com/" target="_blank" rel="noopener noreferrer">
          Inato
        </a>
        .
      </Paragraph>
      <Paragraph>
        Inato is a platform that increases the pool of available patients for
        trials by:
        <ul>
          <li>Matching the best sites for any given study</li>
          <li>
            Ensuring that site partners in our marketplace are successfully
            delivering trials.
          </li>
        </ul>
      </Paragraph>
    </Accordion>
  </Container>
);

const Container = styled.div`
  background: ${colors.SecondaryBackground};
  color: ${colors.DefaultText};
  display: flex;
  flex-direction: column;
  padding: 16px;
  @media ${devices.Desktop} {
    border-left: 8px solid ${colors.GreySecondaryText};
    padding: 16px 32px;
  }
  & ${Accordion} {
    margin-top: 8px;
    :first-of-type {
      margin-top: 16px;
    }
  }
`;

const Title = styled.h1`
  font-size: ${fontSize.Medium};
  font-weight: ${fontWeight.SemiBold};
  line-height: ${lineHeight.Big};
  margin: 0 0 4px 0;

  @media ${devices.Desktop} {
    font-size: ${fontSize.Big};
  }
`;

const Paragraph = styled.p`
  margin: 4px 0 0 0;
`;
