import React from "react";
import { render } from "react-dom";
import App from "./components/App.jsx";

import './styles/index.scss';

render(<App />, document.getElementById("root"));

//render(
//  <Router>
//  <App />
//  </Router>, document.getElementById("root"));