import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { useAPIServiceContext } from '../contexts';

import { colors, devices, fontWeight, Button } from '.';

export const CTAFooter = ({
  className,
  searchTrialsTitle = 'Want to go further?',
}: {
  className?: string;
  searchTrialsTitle?: string;
}) => (
  <Container className={className} data-cy="CTAFooter">
    <Newsletter />
    <RightCard>
      <Title>{searchTrialsTitle}</Title>
      <Paragraph>
        Make your own analysis by <Link to="/search">searching trials</Link>
      </Paragraph>
    </RightCard>
  </Container>
);

export const Newsletter = ({ className }: { className?: string }) => (
  <LeftCard className={className}>
    <Title>Stay updated with new analysis</Title>
    <Paragraph>No spam, at most twice a week, unsubscribe anytime</Paragraph>
    <Form />
  </LeftCard>
);

const Form = () => {
  const apiService = useAPIServiceContext();
  const [isFormSent, setFormSent] = useState(false);

  const onSubmit = useCallback(
    async event => {
      event.preventDefault();

      const target = event.target as HTMLFormElement;
      const email =
        (target.elements.namedItem('email') as HTMLInputElement).value ?? '';

      await apiService.subscribeToNewsletter({ email });

      setFormSent(true);
    },
    [apiService],
  );

  if (isFormSent) {
    return <Paragraph>You have been successfully subscribed!</Paragraph>;
  }

  return (
    <form method="POST" action="#" onSubmit={onSubmit}>
      <Input type="email" name="email" placeholder="Your email..." required />
      <SubscribeButton type="submit">Subscribe</SubscribeButton>
    </form>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media ${devices.Tablet} {
    flex-direction: row;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
  background-color: ${colors.SecondaryBackground};
  border-radius: 4px;
  padding: 16px;
`;

const LeftCard = styled(Card)``;

const RightCard = styled(Card)`
  margin-top: 16px;

  @media ${devices.Tablet} {
    margin-top: 0;
    margin-left: 16px;
  }
`;

const Title = styled.h1`
  color: ${colors.DefaultText};
  font-size: 14px;
  font-weight: ${fontWeight.Medium};
  margin: 0;
`;

const Paragraph = styled.p`
  color: ${colors.GreySecondaryText};
  font-size: 14px;
  font-weight: ${fontWeight.Regular};
  margin: 0;
`;

const Input = styled.input`
  border-radius: 4px;
  border: 1px solid ${colors.Border};
  padding: 7px 15px;
  font-size: 14px;
  line-height: 24px;
  margin-right: 8px;
  outline: none;
  color: ${colors.DefaultText};
  font-weight: ${fontWeight.Regular};
  &:focus {
    border: 1px solid ${colors.Primary};
    transition: border 0.1s cubic-bezier(0.4, 0, 1, 1) 0s;
    animation: 0.1s cubic-bezier(0.4, 0, 1, 1) 0s 1 normal none running dtOkaS;
    box-shadow: rgba(90, 40, 250, 0.2) 0px 0px 0px 2px;
  }
  margin-top: 8px;
  width: calc(100% - 30px);
  max-width: 290px;
  @media ${devices.Desktop} {
    max-width: 240px;
  }
`;

export const SubscribeButton = styled(Button)`
  margin-top: 8px;
  @media ${devices.Tablet} {
    margin-top: 0;
  }
`;

const Link = styled(NavLink)`
  color: ${colors.Primary};
`;
