import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import ReactGA from "react-ga";
import { Router, Switch, Route, Redirect, NavLink } from "react-router-dom";
import { createBrowserHistory } from "history";

import config from "./config";
import { colors, devices } from "./ui";
import { SearchPage } from "./pages/SearchPage";
import logo from "./Logo.svg";
import { AnalysisPage } from "./pages/AnalysisPage";

const history = createBrowserHistory();

const FEEDBACK_LINK =
  "mailto:anticovid@inato.com?subject=Feedback%20Anticovid%20platform&body=Would%20you%20recommend%20the%20Anticovid%20platform%20to%20a%20colleague%20or%20a%20peer%3F%0A%0A%0AIf%20not%2C%20what%20is%20missing%3F%0A%0A%0AWhat%20is%20the%20most%20useful%20feature%20to%20you%20%3F%0A%0A%0AAny%20other%20comments%3F";

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
        <HeaderContainer>
          <Header>
            <Logo src={logo} alt="Inato Anti-Covid Logo" />
            <HeaderLink to="/analysis">Analysis</HeaderLink>
            <HeaderLink to="/search">Search trials</HeaderLink>
            <SendUsFeedbackLink href={FEEDBACK_LINK}>
              Send us feedback
            </SendUsFeedbackLink>
          </Header>
        </HeaderContainer>
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

const HeaderContainer = styled.div`
  background: ${colors.SecondaryBackground};

  @media ${devices.Desktop} {
    height: 65px;
    padding: 0 16px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;

  max-width: 1200px;
  margin: auto;
`;

const Logo = styled.img`
  height: 65px;
  display: block;
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

const linkMixin = css`
  display: block;
  font-size: 16px;
  height: 100%;
  line-height: 48px;
  text-transform: uppercase;
  color: ${colors.GreySecondaryText};
  text-decoration: none;
  text-align: center;
  border-bottom: 2px solid transparent;

  flex-basis: 50%;

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
    flex-basis: inherit;
    text-align: inherit;
    line-height: 63px;
  }
`;

const HeaderLink = styled(NavLink)`
  ${linkMixin}
`;

const SendUsFeedbackLink = styled.a`
  display: none;
  margin-left: auto;
  line-height: 42px;
  text-align: center;
  padding: 0 17px;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 16px;
  color: ${colors.GreySecondaryText};
  border-radius: 4px;

  &:hover {
    background-color: ${colors.LightPurpleBackground};
    color: ${colors.Primary};
  }

  @media ${devices.Desktop} {
    display: block;
  }
`;
