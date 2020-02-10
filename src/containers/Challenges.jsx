import React, { useEffect, useState } from "react";
import withAuthentication from "./../components/auth/WithAuthentication"
import { observer, inject } from "mobx-react";
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
      let challengesUser = await databaseStore.getChallengesUser(localStorage.uid);
      setChallenges(challengesUser);
    }
    console.log('test');
  
    getMatches();
    getChallenges();
  }, [databaseStore])

  return (
    <>
      <h1>Challenges</h1>
      <section>
      <h2>Matches</h2>
        {matches ? (
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
        ) : (
          <p>Not matched with any people yet? You're missing out!</p>
        )}
       
      </section>
      {challenges ? (
        <section>
          <h2>Challenges</h2>
          <article>
           <h3>Geaccepteerd</h3>
            <ul>
              {
                Object.entries(challenges).map(([key, val]) => {
                  if (val.status === "geaccepteerd") {
                    return (
                      <li key={key}>
                        <Link to={"/challenge1/" + val.grens + "/" + val.id}>
                        <h4>{val.naam}</h4>
                        </Link>
                      </li>
                    ) 
                  }
                  return null
                })
              }
            </ul>
          </article>
          <article>
            <h3>Completed</h3>
            <ul>
              {
                Object.entries(challenges).map(([key, val]) => {
                  if (val.status === "gecomplete") {
                    return (
                      <li key={key}>
                        <Link to={"/challenge1/" + val.grens + "/" + val.id}>
                          <h4>{val.naam}</h4>
                        </Link>
                      </li>
                    ) 
                  }
                  return null
                })
              }
            </ul>
          </article>
        </section>
      ) : (
        <p>Haven't accepted any challenges yet? You're missing out!</p>
      )}
    </>
  );
};

export default inject(`databaseStore`)(withAuthentication(observer(Challenges)));
