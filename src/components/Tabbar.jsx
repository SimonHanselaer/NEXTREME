import React from "react";
import { NavLink } from "react-router-dom";
import NavSVG from "./NavSVG";

const Tabbar = () => {

    return (
        <nav>
          <ul>
            <li>
              <NavLink to="/">
                <NavSVG icon="home" state="active" />
                <span className="detail">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/challenges">
                <NavSVG icon="challenges" state="inactive"/>
              <span className="detail">Challenges</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile">
                <NavSVG icon="challenges" state="inactive" />
                <span className="detail">Profile</span>
              </NavLink>
            </li>
          </ul>
        </nav>
    )
}

export default Tabbar;