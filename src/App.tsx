import React from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { colors } from "./ui";
import { SearchPage } from "./SearchPage";
import logo from "./Logo.svg";

export default function App() {
  return (
    <Root>
      <Header>
        <Logo src={logo} alt="Inato Anti-Covid Logo" />
      </Header>
      <Separator />
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {() => <Redirect to="/search" />}
          </Route>
          <Route path="/search">
            <SearchPage />
          </Route>
        </Switch>
      </BrowserRouter>
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

const Separator = styled.div`
  background: ${colors.Separator};
  height: 1px;
`;
