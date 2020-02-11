import React from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./Tabbar.module.css";

import NavSVG from "./NavSVG";

const Tabbar = () => {
  let history = useHistory();
  console.log(history.location.pathname);
    return (
        <nav className="nav">
          <ul className={styles.navUl}>
            <li>
              <Link to="/" className={styles.navLi}>
                <NavSVG icon="home" state={(history.location.pathname === "/") ? "active" : "inactive"} />
                <span className={(history.location.pathname === "/") ? "detail accent" : "detail"}>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/challenges" className={styles.navLi}>
                <NavSVG icon="challenges" state={(history.location.pathname === "/challenges") ? "active" : "inactive"}/>
                <span className={(history.location.pathname === "/challenges") ? "detail accent" : "detail"}>Challenges</span>
              </Link>
            </li>
            <li>
              <Link to="/profile" className={styles.navLi}>
                <NavSVG icon="challenges" state={(history.location.pathname === "/profile") ? "active" : "inactive"} />
                <span className={(history.location.pathname === "/profile") ? "detail accent" : "detail"}>Profile</span>
              </Link>
            </li>
          </ul>
        </nav>
    )
}

export default Tabbar;