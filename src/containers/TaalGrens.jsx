import React from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { observer } from "mobx-react";

const TaalGrens = () => {
  return (
    <>
      <h1>Taal grens</h1>
    </>
  );
};

export default withAuthentication(observer(TaalGrens));
