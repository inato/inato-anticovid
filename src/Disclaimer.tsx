import React from "react";
import styled from "styled-components";

import { colors, Space, Orientation } from "./ui";

export const Disclaimer = () => (
  <>
    <Space orientation={Orientation.vertical} size={48} />
    <Container>
      <Line>
        This website is powered by the{" "}
        <a href="http://apps.who.int/trialsearch/AdvSearch.aspx?SearchTermStat=117&ReturnUrl=%7e%2fListBy.aspx%3fTypeListing%3d0">
          International Clinical Trials Registry Platform
        </a>
        .
      </Line>
      <Line>
        Recent trials might not be visible yet in the platform, but we do our
        best to stay up to date.
      </Line>
      <Line>
        Trials that have been submitted to an ethics committee but not accepted
        are not included in the results so far.
      </Line>
      <Line>
        If you detect errors or inconsistencies in the trials, please send us an
        email at anticovid@inato.com
      </Line>
    </Container>
    <Space orientation={Orientation.vertical} size={48} />
  </>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin: 0 auto;
`;
const Line = styled.span`
  font-size: 12px;
  line-height: 20px;
  color: ${colors.GreySecondaryText};
  a {
    color: ${colors.GreySecondaryText};
  }
`;
