import React from "react";
import * as firebase from 'firebase';
import { NavLink, useHistory } from "react-router-dom";

import { inject, observer } from "mobx-react";

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

          databaseStore.addNewUser(props);

          if (user.additionalUserInfo.isNewUser) {
            history.push("/selectlanguage")
          } else {
            history.push("/");
          }
        });
    }

  return (
    <>
      <h1 className="header-1">Login</h1>
      <button className="button-3" onClick={loginGoogle}>
        <span>Google</span> 
      </button>
      <button className="button-3" onClick={loginFacebook}>
        <span>Facebook</span>
      </button>
      <NavLink to="/loginemail">
        <button className="button-3">
          <span>E-mail</span> 
        </button>
      </NavLink>
      <p className="button-2" onClick={loginAnon}>Skip</p>
    </>
  );
};

export default inject(`databaseStore`, `uiStore`)(observer(Login));
