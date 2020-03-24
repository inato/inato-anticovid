import "react-app-polyfill/ie11";
import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";

import "instantsearch.css/themes/algolia.css";
import "./index.css";

import config from "./config";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

if (config.ga.id) {
  // eslint-disable-next-line
  console.log("GA initialized with tag", config.ga.id);
  ReactGA.initialize(config.ga.id);
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
