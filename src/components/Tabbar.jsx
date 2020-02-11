import React from "react";
import { NavLink, useHistory } from "react-router-dom";

import NavSVG from "./NavSVG";

const Tabbar = () => {
  let history = useHistory();
  console.log(history.location.pathname);

    return (
        <nav>
          <ul>
            <li>
              <NavLink to="/">
                <NavSVG icon="home" state={(history.location.pathname === "/") ? "active" : "inactive"} />
                <span className="detail">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/challenges">
                <NavSVG icon="challenges" state={(history.location.pathname === "/challenges") ? "active" : "inactive"}/>
                <span className="detail">Challenges</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile">
                <NavSVG icon="challenges" state={(history.location.pathname === "/profile") ? "active" : "inactive"} />
                <span className="detail">Profile</span>
              </NavLink>
            </li>
          </ul>
        </nav>
    )
}

export default Tabbar;