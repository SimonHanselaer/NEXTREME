import React, {useState} from "react";
import * as firebase from 'firebase';
import { NavLink, useHistory } from "react-router-dom";

import { inject, observer } from "mobx-react";

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
      <h1 className="header-1">Login</h1>
      <form onSubmit={handleSubmit}>
          <input className="formInput" type="text" placeholder="E-mail" onChange={e => setValueEmail(e.currentTarget.value)}/>
          <input className="formInput" type="password" placeholder="Password" onChange={e => setValuePassword(e.currentTarget.value)}/>
          <button type="submit" className="button-1">Login</button>
      </form>
      <NavLink to="/register">
      <p>Don't have an account yet? Create one</p></NavLink>
    </>
  );
};

export default inject(`uiStore`)(observer(LoginEmail));
