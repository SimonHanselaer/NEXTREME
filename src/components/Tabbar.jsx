import React from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./Tabbar.module.css";
import stylesUI from "../styles/ui.module.css";
import stylesTypo from "../styles/typo.module.css";

import NavSVG from "./NavSVG";

const Tabbar = () => {
  let history = useHistory();
    return (
        <nav className={stylesUI.nav}>
          <ul className={styles.navUl}>
            <li>
              <Link to="/" className={styles.navLi}>
                <NavSVG icon="home" state={(history.location.pathname === "/") ? "active" : "inactive"} />
                <span className={(history.location.pathname === "/") ? styles.active : stylesTypo.detail}>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/challenges" className={styles.navLi}>
                <NavSVG icon="challenges" state={(history.location.pathname === "/challenges") ? "active" : "inactive"}/>
                <span className={(history.location.pathname === "/challenges") ? styles.active : stylesTypo.detail}>Challenges</span>
              </Link>
            </li>
            <li>
              <Link to="/profile" className={styles.navLi}>
                <NavSVG icon="profile" state={(history.location.pathname === "/profile") ? "active" : "inactive"} />
                <span className={(history.location.pathname === "/profile") ? styles.active : stylesTypo.detail}>Profile</span>
              </Link>
            </li>
          </ul>
        </nav>
    )
}

export default Tabbar;