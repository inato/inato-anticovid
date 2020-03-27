import React from "react";
import styled from "styled-components";

import { colors, LaboratoryIcon } from "../../ui";

export const EmptyResults = ({ className }: { className?: string }) => (
  <Container className={className}>
    <StyledLaboratoryIcon />
    <Title>No trial was found with these criteria</Title>
    <Subtitle>Try to broaden your search or remove some filters</Subtitle>
  </Container>
);

const Container = styled.div`
  background-color: ${colors.SecondaryBackground};
  padding: 64px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled.span`
  color: ${colors.DefaultText};
`;

const Subtitle = styled.span`
  color: ${colors.GreySecondaryText};
`;

const StyledLaboratoryIcon = styled(LaboratoryIcon)`
  width: 220px;
  height: 140px;
  opacity: 0.6;
  margin-bottom: 24px;
`;
