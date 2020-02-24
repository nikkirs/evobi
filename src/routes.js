import React, { Component } from "react";
import { Route, IndexRoute } from "react-router";
import { connect } from "react-redux";
import App from "./components/App";
import Player from "./container/preview";

const Rou = (
  <Route>
    <Route path="/" component={App} />
    <Route path="/preview" component={Player} />
  </Route>
);
export default Rou;
