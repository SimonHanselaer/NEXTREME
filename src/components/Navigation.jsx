import React from "react";
import { NavLink, useHistory } from "react-router-dom";

const Navigation = () => {
    let history = useHistory();

    return (
        <nav>
          <ul>
            <li>
              <NavLink to="/">
              <span className="detail">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/challenges">
              <span className="detail">Challenges</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile">
              <span className="detail">Profile</span>
              </NavLink>
            </li>
          </ul>
          <button onClick={() => history.goBack()}>Back</button>
        </nav>
    )
}

export default Navigation;