import React from "react";
import styled from "styled-components";
import { format } from "date-fns";

import { colors } from "../ui";

export const RegistrationDate = ({
  registrationDate
}: {
  registrationDate: string;
}) => {
  const formatedDate = format(new Date(registrationDate), "MMM dd yyyy");
  return <Container>Registered on {formatedDate}</Container>;
};

const Container = styled.div`
  font-size: 12px;
  color: ${colors.GreySecondaryText};
`;
