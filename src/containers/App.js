import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import CultuurGrens from "./CultuurGrens";
import KunstGrens from "./KunstGrens";
import RegioGrens from "./RegioGrens";
import TaalGrens from "./TaalGrens";
import Challenges from "./Challenges";
import Profile from "./Profile";
import Login from "./Login";
import LoginEmail from "./LoginEmail";
import Register from "./Register";
import SelectLanguage from "./SelectLanguage";
import SelectRegio from "./SelectRegio";
import Navigation from "../components/Navigation";

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

          <Route path="/cultuurgrens" exact strict component={CultuurGrens} />
          <Route path="/kunstgrens" exact strict component={KunstGrens} />
          <Route path="/regiogrens" exact strict component={RegioGrens} />
          <Route path="/taalgrens" exact strict component={TaalGrens} />
        </Switch>
      </main>
      </>
    );
  }
}

export default withRouter(App);
