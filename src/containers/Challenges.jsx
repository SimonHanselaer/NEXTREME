import React, { useEffect, useState } from "react";
import withAuthentication from "./../components/auth/WithAuthentication"
import { observer, inject } from "mobx-react";
import MyChallenges from "../components/MyChallenges";
import MyMatches from "../components/MyMatches";

const Challenges = ({databaseStore}) => {
  const [matches, setMatches] = useState("");
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
    console.log('test');
  
    getMatches();
    getChallenges();
  }, [databaseStore])

  return (
    <>
    <section>
      <button className={status ? "noButton header-1" : "noButton"} onClick={() => setStatus(true)}>Mijn uitdagingen</button>
      <button className={status ? "noButton" : "noButton header-1"} onClick={() => setStatus(false)}>Chats</button>
    </section>
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
    </>
  );
};

export default inject(`databaseStore`)(withAuthentication(observer(Challenges)));
