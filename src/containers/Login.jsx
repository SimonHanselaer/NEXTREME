import React from "react";
import * as firebase from 'firebase';
import { NavLink, useHistory } from "react-router-dom";

import { inject, observer } from "mobx-react";

import stylesTypo from '../styles/typo.module.css';
import stylesUi from "../styles/ui.module.css";
import styles from "./Authentication.module.css";

import TopBar from "../components/TopBar";

const Login = ({ databaseStore, uiStore }) => {
  let history = useHistory();

    const loginGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        handleSocialLogin(provider);
    }

    const loginFacebook = () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        handleSocialLogin(provider);
    }

    const loginAnon = () => {
      firebase.auth().signInAnonymously().then(user => {
        
        let props = {
          photo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/User_font_awesome.svg",
          username: "anon#" + user.user.uid.slice(-5),
          uid: user.user.uid
        }

        history.push("/selectlanguage");
        localStorage.setItem("uid", user.user.uid);
        localStorage.setItem("username", "anon#" + user.user.uid.slice(-5))
        uiStore.setUser(user.user.uid);

        databaseStore.addNewUser(props);
      })
    }

    const handleSocialLogin = (provider) => {
        firebase.auth().signInWithPopup(provider).then(user => {
          console.log(user);
          console.log(user.user.photoURL);

          let props = {
            photo: user.user.photoURL,
            username: user.user.displayName,
            uid: user.user.uid
          }

          localStorage.setItem("uid", user.user.uid);
          localStorage.setItem("username", user.user.displayName);
          uiStore.setUser(user.user.uid);

          if (user.additionalUserInfo.isNewUser) {
            databaseStore.addNewUser(props);
            history.push("/selectlanguage")
          } else {
            history.push("/");
          }
        });
    }

  return (
    <>
      <TopBar title="nextend" />
      <div className={stylesUi.contentContainer}>
        {/* <img src="../assets/img/onboarding/acc1.png" alt="" width="220" height="218"/> */}
        <h1 className={`${stylesTypo.header1} ${styles.title}`}>Login</h1>
        <button className={`${stylesUi.button3} ${styles.button} ${stylesTypo.small}`} onClick={loginGoogle}>
          <span>Google</span> 
        </button>
        <button className={`${stylesUi.button3} ${styles.button} ${stylesTypo.small}`} onClick={loginFacebook}>
          <span>Facebook</span>
        </button>
        <div className={styles.line1}></div>
        <p className={styles.break}>of</p>
        <div className={styles.line2}></div>
        <NavLink to="/loginemail">
          <button className={`${stylesUi.button3} ${styles.button} ${stylesTypo.small}`}>
            <span>E-mail</span> 
          </button>
        </NavLink>
        <p className={`${stylesUi.button2} ${styles.button2} ${styles.link}`} onClick={loginAnon}>Skip</p>
      </div>
    </>
  );
};

export default inject(`databaseStore`, `uiStore`)(observer(Login));
