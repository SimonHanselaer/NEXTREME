import React, {useState} from "react";
import * as firebase from 'firebase';
import { NavLink, useHistory } from "react-router-dom";

import { inject, observer } from "mobx-react";

import stylesTypo from '../styles/typo.module.css';
import stylesUi from '../styles/ui.module.css';
import styles from './Authentication.module.css';
import TopBar from "../components/TopBar";

import img from "../assets/img/onboarding/acc2.png"

const LoginEmail = ({ uiStore }) => {
  let history = useHistory();

    const [valueEmail, setValueEmail] = useState("");
    const [valuePassword, setValuePassword] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(valueEmail, valuePassword).then(
            user => {
              history.push("/");
              localStorage.setItem("uid", user.user.uid);
              localStorage.setItem("username", user.user.displayName);
              uiStore.setUser(user.user.uid);
            }, 
            err => {alert(err)}
        );
    }

  return (
    <>
      <TopBar title="nextend" />
      <div className={stylesUi.contentContainer}>
      <img src={img} alt="" width="170" className={styles.img2}/>
      <h1 className={`${stylesTypo.header1} ${styles.title}`}>Login</h1>
      <form onSubmit={handleSubmit}>
          <input className={`${stylesUi.formInput} ${stylesTypo.input}`} type="text" placeholder="E-mail" onChange={e => setValueEmail(e.currentTarget.value)}/>
          <input className={stylesUi.formInput} type="password" placeholder="Password" onChange={e => setValuePassword(e.currentTarget.value)}/>
          <NavLink to="/register">
            <p className={`${stylesTypo.small} ${styles.register}`}>Don't have an account yet? Create one</p>
          </NavLink>
          <button type="submit" className={`${stylesUi.button1} ${styles.loginButton} ${stylesTypo.header1}`}>Login</button>
      </form>
      </div>
    </>
  );
};

export default inject(`uiStore`)(observer(LoginEmail));
