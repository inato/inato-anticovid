import React, { useEffect } from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga';
import { Router, Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import config from '../config';
import logo from '../assets/Logo.svg';

import { colors, devices, CookieBanner } from './ui';
import { AnalysisPage } from './pages/AnalysisPage';
import { SearchPage } from './pages/SearchPage';
import { MethodologyPage } from './pages/MethodologyPage';

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
        <HeaderContainer data-cy="header">
          <Header>
            <LogoLink to="/">
              <img src={logo} alt="Inato Anti-Covid Logo" />
            </LogoLink>
            <HeaderLinkContainer>
              <HeaderLink to="/analysis">Analysis</HeaderLink>
              <HeaderLink to="/search">Search trials</HeaderLink>
              <HeaderLink to="/methodology">Methodology</HeaderLink>
            </HeaderLinkContainer>
            <SendUsFeedbackLink href={config.feedbackUrl} target="_blank">
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
          <Route exact path="/methodology">
            <MethodologyPage />
          </Route>

          <Redirect to="/analysis" />
        </Switch>
      </Router>
      <CookieBanner />
    </Root>
  );
}

const Root = styled.div`
  background: ${colors.MainBackground};
  min-height: 100vh;
`;

const HeaderContainer = styled.div`
  background: ${colors.Primary};
  padding: 32px 0 0 0;

  @media ${devices.Desktop} {
    height: 65px;
    padding: 0;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 100%;

  max-width: 1200px;
  margin: auto;
  @media ${devices.Desktop} {
    padding: 0 16px;
  }
`;

const LogoLink = styled(NavLink)`
  height: 45px;
  display: block;
  flex-basis: 100%;
  width: 100%; /* FOR IE11*/
  margin: 0 auto 26px auto;
  text-align: center;

  @media ${devices.Desktop} {
    margin: 0 110px 0 0;
    width: auto;
    height: auto;
    flex-basis: inherit;
  }
`;

const Separator = styled.div`
  background: ${colors.Separator};
  height: 1px;
`;

const HeaderLinkContainer = styled.div`
  flex-wrap: nowrap;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  height: 100%;
  align-items: center;
  height: 60px;
  width: 100%; /* For IE11 */

  @media ${devices.Desktop} {
    height: 65px;
    width: auto;
  }
`;

const HeaderLink = styled(NavLink)`
  font-size: 18px;
  line-height: 20px;
  vertical-align: middle;
  position: relative;
  color: ${colors.HeaderInactiveText};
  text-decoration: none;
  text-align: center;
  border-bottom: 2px solid transparent;
  white-space: nowrap;

  flex-basis: 33.3%;
  padding: 0 16px;
  box-sizing: border-box;

  &:after {
    opacity: 0;
    position: absolute;
    content: '';
    width: 0;
    height: 2px;
    background-color: ${colors.ButtonText};
    left: 0;
    bottom: -10px;
    transition: opacity 0.2s, bottom 0.2s;
  }

  &:hover::after {
    width: 100%;
  }

  &:hover,
  &.active {
    color: ${colors.ButtonText};
    &:after {
      border-bottom: 2px solid ${colors.ButtonText};
      opacity: 1;
      bottom: -21px;
      width: 100%;
    }
  }

  @media ${devices.Desktop} {
    margin-right: 33px;
    padding: 0 8px;
    flex-basis: inherit;
    text-align: inherit;
    &:hover,
    &.active {
      &:after {
        bottom: -23px;
      }
    }
  }
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
  color: ${colors.ButtonText};
  border-radius: 4px;

  &:hover {
    background-color: ${colors.PrimaryHover};
  }

  @media ${devices.Desktop} {
    display: block;
  }
`;
