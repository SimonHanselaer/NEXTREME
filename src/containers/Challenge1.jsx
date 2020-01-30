import React, { useEffect, useState } from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { observer, inject } from "mobx-react";
import { useParams, Link } from "react-router-dom";
import Recept from "../components/Recept";

const Challenge1 = ({databaseStore}) => {
  let {grens} = useParams();
  let {id} = useParams();
  const [challenge, setChallenge] = useState("");
  const [status, setStatus] = useState(false);

  const getChallenge = async () => {
    const props = {
      challenge: 1,
      grens: grens,
      id: id
    }

    let awaitingChallenge = await databaseStore.getChallenge(props);
    setChallenge(awaitingChallenge);
  }

  useEffect(() => {
    getChallenge();
  },[]);

  if (!status) {
    return (
      <>
        <h1>{challenge.naam}</h1>
        <button onClick={() => setStatus(true)}>Accepteer</button>
        <Link to="/"><button>Weiger</button></Link>
      </>
    ); 
  } else {
    switch (challenge.type) {
      case 'normaal':
        return (
          <>
            <h1>Normaal</h1>
          </>
        );

      case 'recept':
        return (
          <>
            <Recept challenge={challenge} />
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
