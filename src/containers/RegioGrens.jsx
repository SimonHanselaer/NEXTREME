import React from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { observer } from "mobx-react";

const RegioGrens = () => {
  return (
    <>
      <h1>Regio grens</h1>
    </>
  )
}

export default withAuthentication(observer(RegioGrens));
