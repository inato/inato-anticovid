import React from "react";
import styled from "styled-components";

import { Accordion, TextBlockWithLaboratory } from "../../ui";

import { Title } from "./Title";

export const Introduction = () => (
  <TextBlockWithLaboratory data-cy="analysis/intro">
    <StyledTitle>What is anticovid?</StyledTitle>
    <Paragraph>
      Anticovid is an open access platform which gathers all available
      information regarding global clinical trials for SARS-CoV 2 (the virus
      responsible for COVID-19).
    </Paragraph>
    <Paragraph>
      The purpose of Anticovid is to help the global healthcare community access
      essential and comprehensive COVID-19 trial information and research
      trends. Given that the research landscape is evolving at an unprecedented
      pace, this pooling of information is critical for optimizing resource
      allocation, and addressing unmet needs as quickly as possible.
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
  </TextBlockWithLaboratory>
);

const StyledTitle = styled(Title)`
  margin-bottom: 4px;
`;

const Paragraph = styled.p`
  margin: 4px 0 0 0;
`;
