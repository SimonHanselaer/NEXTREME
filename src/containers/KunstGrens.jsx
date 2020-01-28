import React from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { observer } from "mobx-react";

const KunstGrens = () => {
  return (
    <>
      <h1>Kunst grens</h1>
    </>
  )
}

export default withAuthentication(observer(KunstGrens))
