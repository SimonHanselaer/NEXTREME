import React from "react";
import { Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";

const withAuthentication = ComponentToProtect => {
  const WithAuth = props => {
    if (!props.uiStore.authUser && !localStorage.uid) {
      return <Redirect to="/login" />;
    }
    return <ComponentToProtect {...props} authUser={props.uiStore.authUser} />;
  };

  return inject("uiStore")(observer(WithAuth));
};
export default withAuthentication;
