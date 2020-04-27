import React, { useCallback, useState } from 'react';
import { transparentize } from 'polished';

import { styled } from './styled';
import { devices } from './media';
import { colors } from './colors';
import { CloseIcon } from './icons';
import { linkCss } from './styles';

const COOKIE_MAX_AGE_IN_SECONDS = 60 * 60 * 24 * 30; // 30 days
const COOKIE_NAME = `cookie_consent`;

export const CookieBanner = () => {
  const [isDisplayed, setDisplayed] = useState(
    document.cookie.indexOf(COOKIE_NAME) === -1,
  );
  const handleClose = useCallback(() => {
    document.cookie = `${COOKIE_NAME}=true;path=/;max-age=${COOKIE_MAX_AGE_IN_SECONDS}`;
    setDisplayed(false);
  }, []);

  if (!isDisplayed) {
    return null;
  }

  return (
    <Container>
      <ColumnsContainer>
        <Text>
          We use audience measurement cookies to establish anonymous visitor
          statistics, in order to optimize our site based on your usage.
          <br /> Go to our{' '}
          <a
            href="https://inato.com/cookie-policy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cookie Policy
          </a>{' '}
          to find more information or to object to this processing.
        </Text>
        <CloseButton onClick={handleClose} />
      </ColumnsContainer>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${transparentize(0.1, colors.MainBackground)};
`;

const CloseButton = styled(CloseIcon)`
  cursor: pointer;
`;

const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  max-width: 1200px;
  margin: auto;
  padding: 16px;

  ${CloseButton} {
    height: 32px;
    width: 32px;
    min-width: 32px;
    margin-left: 16px;
  }

  @media ${devices.Desktop} {
    ${CloseButton} {
      height: 16px;
      width: 16px;
      min-width: 16px;
      margin-left: 0;
    }
  }
`;

const Text = styled.div`
  a {
    ${linkCss}
  }
`;
