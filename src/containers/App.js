import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";

class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route path="/" exact strict component={Home} />
        </Switch>
      </main>
    );
  }
}

export default withRouter(App);
