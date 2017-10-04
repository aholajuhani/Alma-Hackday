import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Home";

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              render={() => {
                return <h1>404 Not found :(</h1>;
              }}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
