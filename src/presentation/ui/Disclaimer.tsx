import React from 'react';
import styled from 'styled-components';

import { colors } from '.';

export const Disclaimer = () => (
  <Container data-cy="disclaimer">
    <Line>DISCLAIMER</Line>
    <Line>
      This platform is operated free of charge, for the immediate benefit of the
      scientific and medical community in the context of the Covid-19 outbreak
      only.
    </Line>
    <Line>
      The studies that are published on this site have not gone through the
      usual peer-review process or other relevant scientific or legal
      verifications.
    </Line>
    <Line>
      The editor declines any liability in relation to the quality and relevance
      of the data, or the rights of third parties.
    </Line>
    <Line>
      Please refer to the authors before communicating or relying on the
      studies.
    </Line>
    <PrivacyLine>
      © 2020 Inato. All Rights Reserved ・{' '}
      <a
        href="https://inato.com/terms-of-use"
        target="_blank"
        rel="noopener noreferrer"
      >
        Terms of use
      </a>{' '}
      ・{' '}
      <a
        href="https://inato.com/privacy-policy"
        target="_blank"
        rel="noopener noreferrer"
      >
        Privacy policy
      </a>{' '}
      ・{' '}
      <a
        href="https://inato.com/cookie-policy"
        target="_blank"
        rel="noopener noreferrer"
      >
        Cookie policy
      </a>
    </PrivacyLine>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 48px 0;
  color: ${colors.GreySecondaryText};
`;

const Line = styled.span`
  font-size: 12px;
  line-height: 20px;

  a {
    color: ${colors.GreySecondaryText};
    text-decoration: underline;
  }
`;

const PrivacyLine = styled(Line)`
  margin-top: 16px;
`;
