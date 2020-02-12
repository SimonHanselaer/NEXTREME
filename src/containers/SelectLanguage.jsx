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
          <button className="button3" onClick={() => handleSelect("NL")}><span>Nederlands</span></button>
          <button className="button3" onClick={() => handleSelect("FR")}><span>Francais</span></button>
          <button className="button3" onClick={() => handleSelect("ENG")}><span>English</span></button>
      </section>
    </>
  );
};

export default inject(`databaseStore`) (withAuthentication(observer(SelectLanguage)));
