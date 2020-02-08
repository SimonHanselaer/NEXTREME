import React from "react";
import SelectGrens from "./../components/SelectGrens";
import withAuthentication from "./../components/auth/WithAuthentication"
import { observer } from "mobx-react";


const Home = () => {
  return (
    <>
      <h1>Welcome to NEXTEND</h1>
      <p>Ik verleg vandaag mijn</p>
      <SelectGrens />
    </>
  );
};

export default withAuthentication(observer(Home));
