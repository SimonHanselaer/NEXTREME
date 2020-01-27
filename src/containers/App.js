import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
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

class App extends Component {
  render() {
    const {history} = this.props;
    
    return (
      <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/">
              Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/challenges">
              Challenges
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile">
              Profile
              </NavLink>
            </li>
          </ul>
          <button onClick={() => history.goBack()}>Back</button>
        </nav>
      </header>
      <main>
        <Switch>
          <Route path="/" exact strict component={Home} />
          <Route path="/challenges" exact strict component={Challenges} />
          <Route path="/profile" exact strict component={Profile} />
          <Route path="/login" exact strict component={Login} />
          <Route path="/loginemail" exact strict component={LoginEmail} />

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
