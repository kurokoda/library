import "bootstrap/dist/css/bootstrap.min.css";

import "./index.scss";

import React from "react";
import ReactDOM from "react-dom";
import Application from "./view/application";

ReactDOM.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>,
  document.getElementById("root")
);
