import React from "react";
import { NavLink, useHistory } from "react-router-dom";

const Navigation = () => {
    let history = useHistory();

    return (
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
    )
}

export default Navigation;