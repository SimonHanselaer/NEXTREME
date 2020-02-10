import React, { useEffect, useState } from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { observer, inject } from "mobx-react";
import { useParams, Link } from "react-router-dom";
import Recept from "../components/Recept";
import Info from "../components/Info";
import Kaart from "../components/Kaart";
import Scrabble from "../components/Scrabble";

const Challenge1 = ({databaseStore}) => {
  let {grens} = useParams();
  let {id} = useParams();
  const [challenge, setChallenge] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {

    const getChallenge = async () => {
      const props = {
        challenge: 1,
        grens: grens,
        id: id
      }
  
      let awaitingChallenge = await databaseStore.getChallenge(props);
      setChallenge(awaitingChallenge);
    }
    console.log('test');

    getChallenge();
  },[databaseStore, grens, id]);

  if (!status) {
    return (
      <>
        <h1>{challenge.naam}</h1>
        <p>{challenge.extra}</p>
        <button onClick={() => {
          const props = {
            challenge: 'challenge1',
            grens: grens,
            id: id,
            uid: localStorage.uid,
            status: 'geaccepteerd',
            naam: challenge.naam
          }

          databaseStore.updateCompletedChallenges(props);
          setStatus(true)}}>Accepteer</button>
        <Link to="/"><button>Weiger</button></Link>
      </>
    ); 
  } else {
    switch (challenge.type) {
      case 'info':
        return (
          <>
            <Info challenge={challenge} />
          </>
        );

      case 'recept':
        return (
          <>
            <Recept challenge={challenge} />
          </>
        );

      case 'kaart':
        return (
          <>
            <Kaart challenge={challenge} />
          </>
        );

      case 'scrabble':
        return (
          <>
            <Scrabble challenge={challenge} />
          </>
        );
    
      default:
        return (
          <>
            <h1>Whoops! Something went wrong!</h1>
          </>
        );
    }
    
  }
};

export default inject(`databaseStore`)(withAuthentication(observer(Challenge1)));
