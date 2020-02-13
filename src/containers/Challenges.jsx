import React, { useEffect, useState } from "react";
import withAuthentication from "./../components/auth/WithAuthentication"
import { observer, inject } from "mobx-react";
import MyChallenges from "../components/MyChallenges";
import MyMatches from "../components/MyMatches";
import TopBar from "../components/TopBar";

import styles from "./Challenges.module.css";
import stylesUi from "../styles/ui.module.css";

const Challenges = ({databaseStore}) => {
  const [matches, setMatches] = useState();
  const [challenges, setChallenges] = useState();
  const [status, setStatus] = useState(true);

  useEffect(() => {
    const getMatches = async () => {
      let matches = await databaseStore.getMatches(localStorage.uid);
      setMatches(matches);
    }

    const getChallenges = async () => {
      let challengesUser = await databaseStore.getChallengesUser(localStorage.uid);
      setChallenges(challengesUser);
    }
  
    getMatches();
    getChallenges();
  }, [databaseStore])

  return (
    <>
    <TopBar title="nextend" />
    <div className={stylesUi.contentContainer}>
      <section className={`${styles.section} ${styles.sectionLine}`}>
        <button className={status ? "noButton header1" : "noButton"} onClick={() => setStatus(true)}>Mijn uitdagingen</button>
        <button className={status ? "noButton" : "noButton header1"} onClick={() => setStatus(false)}>Chats</button>
      </section>
      <section className={styles.section}>
      {status ? (
        <>
        {challenges ? (
          <MyChallenges challenges={challenges} />
        ) : (
          <p>Haven't accepted any challenges yet? You're missing out!</p>
        )}
      </>
      ) : (
        <>
          {matches ? (
            <MyMatches matches={matches} />
          ) : (
            <p>Haven't matched with any people yet? You're missing out!</p>
          )}
        </>
      )}
      </section>
    </div>
    </>
  );
};

export default inject(`databaseStore`)(withAuthentication(observer(Challenges)));
