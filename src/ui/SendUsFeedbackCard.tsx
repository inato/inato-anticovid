import React from "react";
import styled from "styled-components";

import config from "../config";

import { LinkButton } from "./Button";
import { fontWeight } from "./texts";
import { colors } from "./colors";
import { devices } from "./media";

export const SendUsFeedbackCard = ({ className }: { className?: string }) => (
  <SendUsFeedbackCardContainer className={className}>
    <Title>Any questions or comments?</Title>
    <LinkButton href={config.feedbackUrl}>Send us feedback</LinkButton>
  </SendUsFeedbackCardContainer>
);

const Title = styled.h1`
  color: ${colors.DefaultText};
  font-size: 14px;
  font-weight: ${fontWeight.Medium};
  margin: 0;
  padding-bottom: 8px;
`;

const SendUsFeedbackCardContainer = styled.div`
  background: white;
  display: block;
  padding: 16px;
  margin-bottom: 48px;

  @media ${devices.Desktop} {
    display: none;
  }
`;
