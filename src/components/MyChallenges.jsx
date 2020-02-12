import React, { useState } from "react";
import withAuthentication from "./../components/auth/WithAuthentication"
import { observer, inject } from "mobx-react";
import MyChallengesAccepted from "./MyChallengesAccepted";
import MyChallengesCompleted from "./MyChallengesCompleted";

import styles from "./MyChallenges.module.css";
import stylesUI from "../styles/ui.module.css";

const MyChallenges = props => {
    let challenges = props.challenges;
    const [status, setStatus] = useState(true);

    return (
        <section>
          <article className={styles.article}>
            <button className={status ? styles.subsectionTitle : stylesUI.noButton} onClick={() => setStatus(true)}>Te doen</button>
            <button className={status ? stylesUI.noButton : styles.subsectionTitle} onClick={() => setStatus(false)}>Gedaan</button>
          </article>
  
          {status ? (
           <MyChallengesAccepted challenges={challenges} />
          ) : (
           <MyChallengesCompleted challenges={challenges} />
          )}
        </section>
  );
};

export default inject(`databaseStore`)(withAuthentication(observer(MyChallenges)));
