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
          username: "anon#" + user.user.uid.slice(-5),
          uid: user.user.uid
        }

        history.push("/selectlanguage");
        localStorage.setItem("uid", user.user.uid);
        uiStore.setUser(user.user.uid);

        databaseStore.addNewUser(props);
      })
    }

    const handleSocialLogin = (provider) => {
        firebase.auth().signInWithPopup(provider).then(user => {

          let props = {
            username: user.user.displayName,
            uid: user.user.uid
          }

          localStorage.setItem("uid", user.user.uid);
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
      <h1>Login</h1>
      <button onClick={loginGoogle}>Google</button>
      <button onClick={loginFacebook}>Facebook</button>
      <NavLink to="/loginemail">
        <button>E-mail</button>
      </NavLink>
      <p onClick={loginAnon}>Skip</p>
    </>
  );
};

export default inject(`databaseStore`, `uiStore`)(observer(Login));
