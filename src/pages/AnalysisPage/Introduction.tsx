import React from "react";
import styled from "styled-components";

import { colors, devices } from "../../ui";

import { Accordion } from "./Accordion";
import { LaboratoryIcon } from "./LaboratoryIcon";
import { Title } from "./Title";

export const Introduction = () => (
  <Container>
    <TextContainer>
      <StyledTitle>What is Anticovid?</StyledTitle>
      <Paragraph>
        Anticovid is an open access platform gathering virtually all available
        information in a transparent manner regarding clinical research
        worldwide against SARS-CoV 2 (which is the virus responsible for
        COVID-19).
      </Paragraph>
      <Paragraph>
        The purpose of Anticovid is to provide access to helpful information to
        the global healthcare community, in a constantly evolving landscape. We
        believe this is critical to optimize resource allocation and address
        unmet needs as fast as possible
      </Paragraph>
      <Accordion title="Where does the data come from">
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
      <Accordion title="Who are we">
        <Paragraph>
          Anticovid is provided by{" "}
          <a
            href="https://inato.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
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
    </TextContainer>
    <IconContainer>
      <StyledLaboratoryIcon />
    </IconContainer>
  </Container>
);

const Container = styled.div`
  background: ${colors.SecondaryBackground};
  color: ${colors.DefaultText};
  display: flex;
  flex-direction: column;
  padding: 16px 16px 0 16px;

  @media ${devices.Desktop} {
    flex-direction: row;
    padding: 16px 32px 0 32px;
  }
  & ${Accordion} {
    margin-top: 8px;
    :first-of-type {
      margin-top: 16px;
    }
  }
`;

const TextContainer = styled.div`
  @media ${devices.Desktop} {
    padding-bottom: 16px;
    margin-right: 32px;
  }
`;

const StyledTitle = styled(Title)`
  margin: 0 0 4px 0;
`;

const Paragraph = styled.p`
  margin: 4px 0 0 0;
`;

const IconContainer = styled.div`
  display: flex;
  align-self: center;
  min-width: 250px; /* For IE11. Without it, the icon is not displayed on small screens */
  @media ${devices.Desktop} {
    align-self: flex-end;
    width: 100%;
    height: 100%;
  }
`;

const StyledLaboratoryIcon = styled(LaboratoryIcon)`
  width: 100%;
  height: 100%;
`;
