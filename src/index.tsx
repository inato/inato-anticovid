import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import 'core-js/stable/promise';
import 'core-js/stable/object/entries';
import 'core-js/stable/object/values';
import 'core-js/stable/typed-array/for-each';
import 'core-js/stable/map';

import 'instantsearch.css/themes/algolia.css';
import './index.css';

import config from './config';
import App from './presentation/App';
import * as serviceWorker from './serviceWorker';
import { ModalProvider, ThemeProvider } from './presentation/hooks';
import { FetchAPIService } from './infrastructure';
import { APIServiceContext } from './presentation/contexts';

if (config.ga.id) {
  // eslint-disable-next-line
  console.log('GA initialized with tag', config.ga.id);
  ReactGA.initialize(config.ga.id);
}

const apiService = new FetchAPIService();

ReactDOM.render(
  <ThemeProvider>
    <ModalProvider>
      <APIServiceContext.Provider value={apiService}>
        <App />
      </APIServiceContext.Provider>
    </ModalProvider>
  </ThemeProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
