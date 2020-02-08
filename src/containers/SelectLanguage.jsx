import React from "react";

import { inject, observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import withAuthentication from "../components/auth/WithAuthentication";

const SelectLanguage = ({ databaseStore }) => {
    let history = useHistory();

    const handleSelect = prop => {
        databaseStore.selectLanguage(prop);
        history.push("/selectregio");
    }

  return (
    <>
      <h1>Taal</h1>
      <section>
          <button onClick={() => handleSelect("NL")}>Nederlands</button>
          <button onClick={() => handleSelect("FR")}>Francais</button>
          <button onClick={() => handleSelect("ENG")}>English</button>
      </section>
    </>
  );
};

export default inject(`databaseStore`) (withAuthentication(observer(SelectLanguage)));
