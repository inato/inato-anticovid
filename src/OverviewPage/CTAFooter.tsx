import React from "react";
import styled, { StyledComponent } from "styled-components";

import { colors, devices } from "../ui";

export const CTAFooter = ({ className }: { className?: string }) => (
  <Container className={className}>
    <LeftCard />
    <RightCard>
      <Title>Want to go further?</Title>
      <Paragraph>Make your own analysis by searching trials.</Paragraph>
    </RightCard>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media ${devices.Tablet} {
    flex-direction: row;
  }
`;

const Card = styled.div`
  background-color: ${colors.SecondaryBackground};
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;

  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const LeftCard = styled(Card)``;
const RightCard = styled(Card)`
  @media ${devices.Tablet} {
    margin-left: 16px;
  }
`;

const Title = styled.h1`
  color: ${colors.DefaultText};
  font-size: 14px;
  font-weight: normal;
  margin: 0;
`;

const Paragraph = styled.p`
  color: black;
  font-size: 14px;
  font-weight: normal;
  margin: 0;
`;
