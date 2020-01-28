import React from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { observer } from "mobx-react";

const CultuurGrens = () => {
  return (
    <>
      <h1>Cultuur grens</h1>
    </>
  )
};

export default withAuthentication(observer(CultuurGrens));
