import React, { useEffect, useState } from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { observer, inject } from "mobx-react";
import { useParams, Link } from "react-router-dom";
import Recept from "../components/Recept";
import Info from "../components/Info";
import Kaart from "../components/Kaart";
import Scrabble from "../components/Scrabble";
import TopBar from "../components/TopBar";

import stylesUi from "../styles/ui.module.css";

import stylesTypo from '../styles/typo.module.css';

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
        <TopBar title="empty" />
          <div className={`${stylesUi.contentContainer}`}>
          <h1 className={stylesTypo.header1}>{challenge.naam}</h1>
          <p>{challenge.extra}</p>
          <button className="button1" onClick={() => {
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
          <Link to="/"><button className="button2">Weiger</button></Link>
        </div>
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
            <Recept challenge={challenge} databaseStore={databaseStore} grens={grens} challengeId={id} />
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
