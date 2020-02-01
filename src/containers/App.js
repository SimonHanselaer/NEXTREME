import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Challenges from "./Challenges";
import Profile from "./Profile";

import Login from "./Login";
import LoginEmail from "./LoginEmail";
import Register from "./Register";

import SelectLanguage from "./SelectLanguage";
import SelectRegio from "./SelectRegio";

import Navigation from "../components/Navigation";

import Challenge1 from "./Challenge1";
import Challenge2 from "./Challenge2";
import Challenge3 from "./Challenge3";
import Challenge4 from "./Challenge4";

class App extends Component {
  render() {
    
    return (
      <>
      <main>
        <Switch>
          <Route path="/" exact strict>
            <Navigation />
            <Home />
          </Route>

          <Route path="/challenges" exact strict>
            <Navigation />
            <Challenges />
          </Route>

          <Route path="/profile" exact strict>
            <Navigation />
            <Profile />
          </Route>

          <Route path="/login" exact strict component={Login} />
          <Route path="/loginemail" exact strict component={LoginEmail} />
          <Route path="/register" exact strict component={Register} />

          <Route path="/selectlanguage" exact strict component={SelectLanguage} />
          <Route path="/selectregio" exact strict component={SelectRegio} />

          <Route path="/challenge1/:grens/:id" exact strict>
            <Navigation />
            <Challenge1 />
          </Route>
          <Route path="/challenge2/:grens/:id" exact strict>
            <Navigation />
            <Challenge2 />
          </Route>
          <Route path="/challenge3/:grens/:id" exact strict>
            <Navigation />
            <Challenge3 />
          </Route>
          <Route path="/challenge4/:grens/:id" exact strict>
            <Navigation />
            <Challenge4 />
          </Route>

        </Switch>
      </main>
      </>
    );
  }
}

export default withRouter(App);
