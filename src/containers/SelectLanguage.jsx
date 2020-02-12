import React from "react";

import { inject, observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import withAuthentication from "../components/auth/WithAuthentication";

import stylesUi from "../styles/ui.module.css";
import stylesTypo from "../styles/typo.module.css";
import styles from "./Onboarding.module.css";

import TopBar from "../components/TopBar";

import img from "../assets/img/onboarding/acc3.png"

const SelectLanguage = ({ databaseStore }) => {
    let history = useHistory();

    const handleSelect = prop => {
        databaseStore.selectLanguage(prop);
        history.push("/selectregio");
    }

  return (
    <>
    <TopBar title="nextend" />
    <div className={styles.contentContainer}>
      <img src={img} alt="" width="305" className={styles.imgLang}/>
      <h1 className={stylesTypo.header1}>Taal</h1>
        <section>
            <button className={`${stylesUi.button3} ${stylesTypo.small} ${styles.button}`} onClick={() => handleSelect("NL")}><span>Nederlands</span></button>
            <button className={`${stylesUi.button3} ${stylesTypo.small} ${styles.button}`} onClick={() => handleSelect("FR")}><span>Francais</span></button>
            <button className={`${stylesUi.button3} ${stylesTypo.small} ${styles.button}`} onClick={() => handleSelect("ENG")}><span>English</span></button>
        </section>
        <svg width="28" height="10" viewBox="0 0 28 10" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.onboardingCount}>
        <circle cx="5" cy="5" r="5" fill="#FF986F"/>
        <circle cx="23" cy="5" r="5" fill="#FF986F" fillOpacity="0.1"/>
        </svg>

    </div>
    </>
  );
};

export default inject(`databaseStore`) (withAuthentication(observer(SelectLanguage)));
