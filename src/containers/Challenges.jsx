import React from "react";
import withAuthentication from "./../components/auth/WithAuthentication"
import { observer } from "mobx-react";

const Challenges = () => {
  return (
    <>
      <h1>Challenges</h1>
    </>
  );
};

export default withAuthentication(observer(Challenges));
