import React from "react";
import styled from "styled-components";

import { colors, devices, LaboratoryIcon, Accordion } from ".";

export const TextBlockWithLaboratory = ({
  children
}: {
  children: React.ReactNode;
}) => (
  <Container>
    <TextContainer>{children}</TextContainer>
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
