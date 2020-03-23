import React from "react";
import styled from "styled-components";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  NavLink
} from "react-router-dom";

import { colors } from "./ui";
import { SearchPage } from "./SearchPage";
import logo from "./Logo.svg";
import { OverviewPage } from "./OverviewPage";

export default function App() {
  return (
    <Root>
      <BrowserRouter>
        <Header>
          <Logo src={logo} alt="Inato Anti-Covid Logo" />
          <HeaderLink to="/overview">Overview</HeaderLink>
          <HeaderLink to="/search">Search trials</HeaderLink>
        </Header>
        <Separator />
        <Switch>
          <Route exact path="/">
            {() => <Redirect to="/search" />}
          </Route>
          <Route exact path="/overview">
            <OverviewPage />
          </Route>
          <Route exact path="/search">
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

const Logo = styled.img`
  margin-right: 48px;
`;

const Separator = styled.div`
  background: ${colors.Separator};
  height: 1px;
`;

const HeaderLink = styled(NavLink)`
  font-size: 16px;
  line-height: 20px;
  height: 100%;
  vertical-align: middle;
  line-height: 65px;
  text-transform: uppercase;
  color: #647b91;
  text-decoration: none;
  margin-right: 33px;
  box-sizing: border-box;

  &:hover,
  &.active {
    color: #5928fa;
    border-bottom: 2px solid #5928fa;
  }

  &:last-child {
    margin-right: 0;
  }
`;
