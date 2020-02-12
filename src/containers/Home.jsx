import React from "react";
import SelectGrens from "./../components/SelectGrens";
import withAuthentication from "./../components/auth/WithAuthentication"
import { observer } from "mobx-react";
import TopBar from "../components/TopBar";

import styles from "./Home.module.css";
import stylesUi from "../styles/ui.module.css";
import stylesTypo from "../styles/typo.module.css";

const Home = () => {
  return (
    <>
      <TopBar title="nextend" />
      <div className={stylesUi.contentContainer}>
        <article>
          <h2 className={stylesTypo.header2}>Ik verleg vandaag mijn</h2>
          <div className={stylesUi.shortLine}></div>
          <section className={styles.scrollContainer}>
            <SelectGrens />
          </section>
        </article>
      </div>
    </>
  );
};

export default withAuthentication(observer(Home));
