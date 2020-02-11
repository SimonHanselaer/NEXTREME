import React from "react";
import SelectGrens from "./../components/SelectGrens";
import withAuthentication from "./../components/auth/WithAuthentication"
import { observer } from "mobx-react";

const Home = () => {
  return (
    <>
      <h1 className="visually-hidden">NEXTEND</h1>
      <article>
        <h2 className="header-2">Ik verleg vandaag mijn</h2>
        <SelectGrens />
      </article>
    </>
  );
};

export default withAuthentication(observer(Home));
