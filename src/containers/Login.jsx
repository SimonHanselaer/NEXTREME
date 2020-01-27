import React from "react";
import * as firebase from 'firebase';
import { NavLink } from "react-router-dom";

const Login = () => {
    function loginGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        handleSocialLogin(provider);
    }

    function loginFacebook() {
        const provider = new firebase.auth.FacebookAuthProvider();
        handleSocialLogin(provider);

    }

    function handleSocialLogin(provider) {
        firebase.auth().signInWithPopup(provider).then(result => console.log(result));
    }

  return (
    <>
      <h1>Login</h1>
      <button onClick={loginGoogle}>Google</button>
      <button onClick={loginFacebook}>Facebook</button>
      <NavLink to="/loginemail">
        <button>E-mail</button>
      </NavLink>
    </>
  );
};

export default Login;
