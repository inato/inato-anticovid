import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { colors, devices } from "../ui";

const ZappierHookUrl = "https://hooks.zapier.com/hooks/catch/6538069/o1x0ecd/";

export const CTAFooter = ({ className }: { className?: string }) => (
  <Container className={className}>
    <LeftCard>
      <Title>Stay updated with new analyses</Title>
      <SecondaryParagraph>
        No spam, at most twice a week, unsubscribe anytime
      </SecondaryParagraph>
      <Form />
    </LeftCard>
    <RightCard>
      <Title>Want to go further?</Title>
      <Paragraph>
        Make your own analysis by{" "}
        <NavLink to="/search">searching trials</NavLink>.
      </Paragraph>
    </RightCard>
  </Container>
);

const Form = () => {
  const [isFormSent, setFormSent] = useState(false);
  if (isFormSent) {
    return <Paragraph>You have been successfully suscribed!</Paragraph>;
  }

  return (
    <form
      method="POST"
      action="#"
      onSubmit={async event => {
        event.preventDefault();

        const target = event.target as HTMLFormElement;
        const body = {
          email:
            (target.elements.namedItem("email") as HTMLInputElement).value ?? ""
        };
        await fetch(ZappierHookUrl, {
          method: "POST",
          body: JSON.stringify(body)
        });
        setFormSent(true);
      }}
    >
      <Input type="email" name="email" placeholder="Your email..." />
      <Button type="submit">Suscribe</Button>
    </form>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

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
  margin-bottom: 16px;
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

const SecondaryParagraph = styled.p`
  color: ${colors.GreySecondaryText};
  font-size: 12px;
  font-weight: normal;
  margin: 0;
`;

const Input = styled.input`
  border-radius: 4px;
  border: 1px solid ${colors.Border};
  padding: 8px 16px;
  margin-right: 8px;
`;

const Button = styled.button`
  border-radius: 4px;
  padding: 8px 16px;
  color: ${colors.SecondaryBackground};
  background-color: ${colors.Primary};
`;
