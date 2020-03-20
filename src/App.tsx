import React from "react";
import styled from "styled-components";

import { colors } from "./ui";
import { SearchPage } from "./SearchPage";
import logo from "./Logo.svg";

export default function App() {
  return (
    <Root>
      <Header>
        <Logo src={logo} alt="Inato Anti-Covid Logo" />
      </Header>
      <SearchPage />
    </Root>
  );
}

const Root = styled.div`
  background: ${colors.MainBackground};
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  background: ${colors.SecondaryBackground};
  height: 65px;
  padding: 0 120px;
`;

const Logo = styled.img``;
