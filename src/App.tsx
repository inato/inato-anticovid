import React, { useEffect } from "react";
import styled from "styled-components";
import ReactGA from "react-ga";
import { Router, Switch, Route, Redirect, NavLink } from "react-router-dom";
import { createBrowserHistory } from "history";

import config from "./config";
import { colors, devices } from "./ui";
import { SearchPage } from "./SearchPage";
import logo from "./Logo.svg";
import { AnalysisPage } from "./AnalysisPage";

const history = createBrowserHistory();

export default function App() {
  useEffect(() => {
    if (config.ga.id) {
      ReactGA.pageview(history.location.pathname + history.location.search);
    }
  });

  history.listen(location => {
    if (config.ga.id) {
      ReactGA.pageview(location.pathname + location.search);
    }
  });

  return (
    <Root>
      <Router history={history}>
        <Header>
          <Logo src={logo} alt="Inato Anti-Covid Logo" />
          <HeaderLink to="/analysis">Analysis</HeaderLink>
          <HeaderLink to="/search">Search trials</HeaderLink>
        </Header>
        <Separator />
        <Switch>
          <Route exact path="/analysis">
            <AnalysisPage />
          </Route>
          <Route exact path="/search">
            <SearchPage />
          </Route>
          <Redirect to="/analysis" />
        </Switch>
      </Router>
    </Root>
  );
}

const Root = styled.div`
  background: ${colors.MainBackground};
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  background: ${colors.SecondaryBackground};
  padding: 0 10vw;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;

  @media ${devices.Desktop} {
    height: 65px;
    padding: 0 120px;
  }
`;

const Logo = styled.img`
  height: 65px;
  flex-basis: 100%;
  width: 100%; /* FOR IE11*/
  margin: 32px auto 16px auto;

  @media ${devices.Desktop} {
    width: auto;
    margin: 0 48px 0 0;
    height: auto;
    flex-basis: inherit;
  }
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
  line-height: 48px;
  text-transform: uppercase;
  color: ${colors.GreySecondaryText};
  text-decoration: none;
  box-sizing: border-box;
  text-align: center;

  flex-grow: 1;

  &:hover {
    border-bottom: 2px solid ${colors.GreySecondaryText};
  }

  &.active {
    color: ${colors.Primary};
    border-bottom: 2px solid ${colors.Primary};
  }

  &:last-child {
    margin-right: 0;
  }

  @media ${devices.Desktop} {
    margin-right: 33px;
    padding-left: 10vw;
    padding-left: 0;
    flex-grow: inherit;
    text-align: inherit;
    line-height: 65px;
  }
`;
