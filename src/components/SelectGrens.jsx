import React from "react";
import { inject, observer } from "mobx-react";
import GrensCard from "./GrensCard";

const SelectGrens = ({ dataStore }) => {
  const {grenzen} = dataStore;

  return (
    <>
    {grenzen.map(grens => (
      <GrensCard name={grens} key={grens} />
      ))}
    </>
  );
};

export default inject(`dataStore`)(observer(SelectGrens));
