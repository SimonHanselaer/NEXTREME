import React, {useState} from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { observer, inject } from "mobx-react";
import { useParams } from "react-router-dom";

import main from "../assets/img/template4Onboarding.png";

import Challenge4Kortrijk from "../components/Challenge4Kortrijk";
import Challenge4Doornik from "../components/Challenge4Doornik";
import Challenge4Lille from "../components/Challenge4Lille";
import TopBar from "../components/TopBar";

import styles from "./Challenge4.module.css";
import stylesUi from "../styles/ui.module.css";

const Challenge4 = ({ databaseStore }) => {
  let { grens } = useParams();
  let { id } = useParams();

  const [status, setStatus] = useState(false);

  if (!status) {
    return (
      <>
        <TopBar title="empty" />
        <img className={styles.main} src={main} alt="Een afbeelding met een knipoog naar de uitdaging."/>
        <div className={styles.card01}>
          <p>Versleep de juiste typische monumenten, dranken, eten ... naar de stad. Als het niet klopt, versleep naar de vuilbak.</p>
          <p className={stylesUi.shortLine}></p>
        </div>
        <button className={styles.button1Start} onClick={() => setStatus(true)}>Start</button>
      </>
    ) 
  } else {
      switch (id) {
        case '1':
          return (
            <>
            <TopBar title="Kortrijk" />
             <section className={styles.topstuk}>
              <Challenge4Kortrijk grens={grens} databaseStore={databaseStore} />
            </section>
            </>
          );

        case '2':
          return (
            <>
            <TopBar title="Doornik" />
             <section className={styles.topstuk}>
              <Challenge4Doornik grens={grens} databaseStore={databaseStore} />
            </section>
            </>
          );

        case '3':
          return (
            <>
            <TopBar title="Lille" />
            <section className={styles.topstuk}>
              <Challenge4Lille grens={grens} databaseStore={databaseStore} />
            </section>
            </>
          );

         default:
          return (
             <h1>Whoops! Something went wrong!</h1>
          );
       }
  }
 
}

export default inject(`databaseStore`)(withAuthentication(observer(Challenge4)));
