import React from "react";
import SelectGrens from "./../components/SelectGrens";
import withAuthentication from "./../components/auth/WithAuthentication"
import { observer } from "mobx-react";
import TopBar from "../components/TopBar";

import stylesUi from "../styles/ui.module.css";
import stylesTypo from "../styles/typo.module.css";

const Home = () => {
  return (
    <>
      <TopBar title="nextend" />
      <div className={stylesUi.contentContainer}>
        <article>
          <h2 className={stylesTypo.headerOne}>Ik verleg vandaag mijn</h2>
          <SelectGrens />
        </article>
      </div>
    </>
  );
};

export default withAuthentication(observer(Home));
