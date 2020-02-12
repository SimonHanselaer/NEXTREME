import React from "react";

import { inject, observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import withAuthentication from "../components/auth/WithAuthentication";

import stylesUi from "../styles/ui.module.css";
import stylesTypo from "../styles/typo.module.css";
import styles from "./Onboarding.module.css";

import TopBar from "../components/TopBar";

import img from "../assets/img/onboarding/acc4.png";

const SelectRegio = ({ databaseStore }) => {
  let history = useHistory();

  const handleSelect = prop => {
    databaseStore.selectRegio(prop);
    history.push("/");
  }

  return (
    <>
      <TopBar title="nextend" />
      <div className={styles.contentContainer}>
      <img src={img} alt="" width="305" className={styles.imgReg}/>
      <h1 className={stylesTypo.header1}>Je bevind je in...</h1>
      <section>
          <button className={styles.chooseButton} onClick={() => handleSelect("VL")}><span>Vlaanderen</span></button>
          <button className={styles.chooseButton} onClick={() => handleSelect("WL")}><span>Wallonië</span></button>
          <button className={styles.chooseButton} onClick={() => handleSelect("FR")}><span>Frankrijk</span></button>
          <button className={styles.chooseButton} onClick={() => handleSelect("ANDERE")}><span>Andere</span></button>
      </section>
      <svg width="28" height="10" viewBox="0 0 28 10" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.onboardingCount}>
      <circle cx="23" cy="5" r="5" transform="rotate(-180 23 5)" fill="#FF986F"/>
      <circle cx="5" cy="5" r="5" transform="rotate(-180 5 5)" fill="#FF986F" fillOpacity="0.1"/>
      </svg>
      </div>
    </>
  );
};

export default inject(`databaseStore`)(withAuthentication(observer(SelectRegio)));
