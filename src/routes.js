import React from "react";
import { Route } from "react-router";

import App from "./components/App";
import Player from "./container/preview";
import Game from "./components/player";

const Router = (
  <Route>
    <Route path="/" component={App} />
    <Route path="/preview" component={Player} />
    <Route path="/game" component={Game} />
  </Route>
);
export default Router;
