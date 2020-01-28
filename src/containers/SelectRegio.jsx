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
      <h1>Regio</h1>
      <section>
          <button onClick={() => handleSelect("VL")}>Vlaanderen</button>
          <button onClick={() => handleSelect("WL")}>Wallonië</button>
          <button onClick={() => handleSelect("FR")}>Frankrijk</button>
          <button onClick={() => handleSelect("ANDERE")}>Andere</button>
      </section>
    </>
  );
};

export default inject(`databaseStore`)(withAuthentication(observer(SelectRegio)));
