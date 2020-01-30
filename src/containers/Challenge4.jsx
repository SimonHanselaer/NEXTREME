import React from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { observer, inject } from "mobx-react";
import {useParams} from "react-router-dom";

const Challenge4 = ({ databaseStore }) => {
  let {grens} = useParams();

  const getChallenge = () => {
    const props = {
      challenge: 4,
      grens: grens
    }

    let challenge = databaseStore.getChallenge(props);
    console.log(challenge);
  }

  return (
    <>
      <h1 onClick={() => getChallenge()}>Challenge 4 - {grens}</h1>
      <section>
        <h2>De uitdaging:</h2>
        <p>

        </p>
      </section>
    </>
  )
}

export default inject(`databaseStore`)(withAuthentication(observer(Challenge4)));
