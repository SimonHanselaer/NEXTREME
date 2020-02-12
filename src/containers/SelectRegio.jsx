import React from "react";

import { inject, observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import withAuthentication from "../components/auth/WithAuthentication";

const SelectRegio = ({ databaseStore }) => {
  let history = useHistory();

  const handleSelect = prop => {
    databaseStore.selectRegio(prop);
    history.push("/");
  }

  return (
    <>
      <h1>Je bevind je in...</h1>
      <section>
          <button className="buttonThree" onClick={() => handleSelect("VL")}><span>Vlaanderen</span></button>
          <button className="buttonThree" onClick={() => handleSelect("WL")}><span>Wallonië</span></button>
          <button className="buttonThree" onClick={() => handleSelect("FR")}><span>Frankrijk</span></button>
          <button className="buttonThree" onClick={() => handleSelect("ANDERE")}><span>Andere</span></button>
      </section>
    </>
  );
};

export default inject(`databaseStore`)(withAuthentication(observer(SelectRegio)));
