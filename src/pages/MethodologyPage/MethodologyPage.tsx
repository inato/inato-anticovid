import React from 'react';
import styled from 'styled-components';

import {
  Disclaimer,
  CTAFooter,
  SendUsFeedbackCard,
  devices,
  TextBlockWithLaboratory,
  BlockTitle,
  Accordion,
  linkCss,
} from '../../ui';

export const MethodologyPage = () => {
  return (
    <Container>
      <TextBlockWithLaboratory dataCy="methodology/main">
        <Title>Methodology</Title>
        <Accordion title="Where do we find trials?">
          <Paragraph>
            Trials listed in Anticovid mainly come from public registries or
            aggregators, including:
          </Paragraph>
          <ul>
            <StyledLi>
              <StyledLink
                href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
                target="_blank"
              >
                WHO clinical trials registry platform
              </StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink href="https://clinicaltrials.gov" target="_blank">
                clinicaltrials.gov
              </StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink href="https://chictr.org.cn" target="_blank">
                chictr.org.cn
              </StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink
                href="https://clinicaltrialsregister.eu"
                target="_blank"
              >
                clinicaltrialsregister.eu
              </StyledLink>
            </StyledLi>
          </ul>
          <Paragraph>
            Those registries and websites are very well known from most
            researchers and have been very active to include as fast as possible
            clinical studies that were registered. However, there was to our
            knowledge no unique and centralized repository where{' '}
            <Bold>all</Bold> clinical studies conducted worldwide on COVID-19
            could be found.
          </Paragraph>
        </Accordion>

        <Accordion title="How often is updated our dataset?">
          <Paragraph>
            <Bold>Every day</Bold>, we fetch new trials from these sources to
            make them available in Anticovid.
          </Paragraph>
          <Paragraph>
            Since all registries may need a delay to update and since
            researchers may not always be able to register their studies in an
            ideal timeframe, current data may be subject to subtle bias, meaning
            that some studies may not be searchable yet while they are about to
            start or even already launched. However, Anticovid is still among
            the most complete and most updated registries available.
          </Paragraph>
          <Paragraph>
            The report available in the page “Analysis” is manually updated by
            our teams and therefore can exhibit very small gaps as compared to
            the trials available in the page “Search trials”.
          </Paragraph>
        </Accordion>

        <Accordion title="Where do we find publications of results?">
          <Paragraph>
            To find publications of results linked to clinical trials, we are
            leveraging several aggregators, among which:
          </Paragraph>
          <ul>
            <StyledLi>
              <StyledLink
                href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/global-research-on-novel-coronavirus-2019-ncov"
                target="_blank"
              >
                WHO Global research on COVID-19
              </StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink
                href="http://www.metaevidence.org/covid19.aspx"
                target="_blank"
              >
                MetaEvidence - COVID-19
              </StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink
                href="https://www.ncbi.nlm.nih.gov/pubmed/"
                target="_blank"
              >
                Pubmed
              </StyledLink>
            </StyledLi>
          </ul>
          <Paragraph>
            For each publication of the result, we also include the{' '}
            <StyledLink href="https://pubpeer.com" target="_blank">
              PubPeer
            </StyledLink>{' '}
            link, when possible.
          </Paragraph>
        </Accordion>

        <Accordion title="What processing is done for each trial?">
          <Paragraph>
            First, already structured data that we collect are displayed ad
            integrum, even though we standardize their presentation for the sake
            of intuitive comparison. Second, our internal expert in medicine and
            clinical research &quot;manually&quot; study each trial to extract
            other characteristics:
          </Paragraph>

          <ul>
            <StyledLi>
              Primary outcomes are classified as follows: clinical, surrogate,
              clinical scale or clinical element other than hard endpoints
              classified in &quot;clinical&quot; <br />
              <Italic>
                This feature is still under development and might lead to some
                miscategorized outcomes.
              </Italic>
            </StyledLi>
            <StyledLi>Total recruitment target</StyledLi>
            <StyledLi>
              Treatment or intervention: either classified by agent or
              therapeutic class depending on their relevance (for instance,
              antiviral are gathered in one subgroup while chloroquine and
              hydroxycloroquine have been individualized due to the hot topic
              their represent)
            </StyledLi>
          </ul>
          <Paragraph>
            Please contact{' '}
            <StyledLink href="mailto:anticovid@inato.com" target="_blank">
              anticovid@inato.com
            </StyledLink>{' '}
            if you have questions or remarks regarding our methodology.
          </Paragraph>
        </Accordion>
      </TextBlockWithLaboratory>
      <StyledSendUsFeedbackCard />
      <StyledCTAFooter searchTrialsTitle="Explore ongoing clinical trials" />
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

const StyledSendUsFeedbackCard = styled(SendUsFeedbackCard)`
  margin-top: 16px;

  @media ${devices.Desktop} {
    display: none;
  }
`;

const StyledCTAFooter = styled(CTAFooter)`
  margin-top: 16px;
`;

const Title = styled(BlockTitle)`
  margin-bottom: 4px;
`;

const Paragraph = styled.p`
  margin: 4px 0 0 0;
`;

const StyledLi = styled.li`
  margin-top: 4px;
`;

const StyledLink = styled.a`
  ${linkCss};
`;

const Bold = styled.span`
  font-weight: bold;
`;

const Italic = styled.span`
  font-style: italic;
`;
