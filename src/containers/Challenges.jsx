import React from "react";
import withAuthentication from "./../components/auth/WithAuthentication"
import { observer, inject, PropTypes } from "mobx-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Challenges = ({databaseStore}) => {
  const [matches, setMatches] = useState("");
  const [challenges, setChallenges] = useState();

  useEffect(() => {
    const getMatches = async () => {
      let matches = await databaseStore.getMatches(localStorage.uid);
      setMatches(matches);
    }

    const getChallenges = async () => {
      let challenges = [];
      let challengesUser = await databaseStore.getChallengesUser(localStorage.uid);

      const props = {}
      Object.entries(challengesUser).map(([key, val]) => {
        props.grens = key;
        Object.entries(val).map(async ([key, val]) => {
          let naam = await databaseStore.getChallangeName(props.grens, key);
          let challenge = {naam, val}
          challenges.push(challenge);
          setChallenges(challenges);
        })
      })
    }
  
    getMatches();
    getChallenges();
  }, [databaseStore, setChallenges])

  return (
    <>
      <h1>Challenges</h1>
      <section>
        <h2>Matches</h2>
        <ul>
        {
          Object.entries(matches).map(([key, val]) => {
            if (key !== "doNotDelete") {
              return (
                <li key={key}>
                    <p>{val.username}</p>
                    <Link to={"/room/" + val.roomId}>
                      <button>
                        More questions
                      </button>
                    </Link>
                </li>
                )
            } 
            return null
              })
            }
        </ul>
      </section>
      <section>
        <h2>Challenges</h2>
        <article>
          <h3>Geaccepteerd</h3>
          <ul>
            {
              challenges ? (
              challenges.forEach(challenge => {
                console.log(challenge)
                return (
                <li>
                  <h3>{challenge.naam}</h3>
                </li>)
              })) : (
                <p>Loading</p>
              )
            }
          </ul>
        </article>
        <article>
          <h3>Completed</h3>
        </article>
      </section>
    </>
  );
};

export default inject(`databaseStore`)(withAuthentication(observer(Challenges)));
