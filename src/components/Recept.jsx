import React from "react";
import { useState } from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { observer } from "mobx-react";
import Ingredienten from "./Ingredienten";
import Bereiding from "./Bereiding";
import { useHistory } from "react-router-dom";

import stylesTypo from '../styles/typo.module.css';
import TopBar from "../components/TopBar";
import styles from "./Recept.module.css";
import stylesUI from "../styles/ui.module.css";

import img from "../assets/img/template1Fruit.png"

const Recept = (props) => {
    const challenge = props.challenge;
    const grens = props.grens;
    const challengeId = props.challengeId;
    const {databaseStore} = props;
    const [status, setStatus] = useState(true);

    let history = useHistory();

    return (
      <>
        <section>
          <TopBar title={challenge.naam} />
          <div className={styles.contentContainer}>
            <img src={img} alt="" className={styles.img} />
            <section className={styles.infoCard}>
              <h2 className={stylesUI.visuallyHidden}>Info</h2>
              <article>
                <h3 className={stylesTypo.small}>Personen</h3>
                <p className={stylesTypo.accent}>{challenge.personen}</p>
              </article>
              <article>
                <h3 className={stylesTypo.small}>Werk tijd</h3>
                <p className={stylesTypo.accent}>{challenge.werkTijd}</p>
              </article>
              <article>
                <h3 className={stylesTypo.small}>Totale tijd</h3>
                <p className={stylesTypo.accent}>{challenge.totaleTijd}</p>
              </article>
            </section>
            <section className={`${styles.section} ${styles.sectionLine}`}>
              <button
                className={status ? 'header1 noButton' : 'noButton'}
                onClick={() => setStatus(true)}
              >
                Ingrediënten
              </button>
              <button
                className={status ? 'noButton' : 'header1 noButton'}
                onClick={() => setStatus(false)}
              >
                Bereiding
              </button>
            </section>
            <section className={styles.section}>
              {status ? (
                <Ingredienten ingredienten={challenge.ingrediënten} />
              ) : (
                <Bereiding stappen={challenge.stappen} />
              )}
            </section>
            <button
              className={stylesUI.button1}
              onClick={() => {
                const props = {
                  challenge: 'challenge1',
                  grens: grens,
                  id: challengeId,
                  uid: localStorage.uid,
                  status: 'gecomplete',
                  naam: challenge.naam
                };

                databaseStore.updateCompletedChallenges(props);
                history.push('/');
              }}
            >
              Uitdaging compleet!
            </button>
          </div>
        </section>
      </>
    );

    
}

export default withAuthentication(observer(Recept));