import React from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { observer, inject } from "mobx-react";
import { useHistory } from "react-router-dom";

const Profile = ({uiStore}) => {
  let history = useHistory();

  const handleLogout = () => {
    uiStore.logout();
    history.push("/login")
  }

  return (
    <>
      <h1>Profile</h1>
      <button onClick={() => handleLogout()}></button>
    </>
  );
};

export default inject(`uiStore`) (withAuthentication(observer(Profile)));
