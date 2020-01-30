import React, { useEffect, useState } from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { observer, inject } from "mobx-react";
import { useParams, Link } from "react-router-dom";

const Challenge1 = ({databaseStore}) => {
  let {grens} = useParams();
  let {id} = useParams();
  const [challenge, setChallenge] = useState("");

  const getChallenge = async () => {
    const props = {
      challenge: 1,
      grens: grens,
      id: id
    }

    let awaitingChallenge = await databaseStore.getChallenge(props);
    setChallenge(awaitingChallenge)
  }

  useEffect(() => {
    getChallenge();
  },[]);

  return (
    <>
      <h1>{challenge.naam}</h1>
      <button>Accepteer</button>
      <Link to="/"><button>Weiger</button></Link>
    </>
  );
};

export default inject(`databaseStore`)(withAuthentication(observer(Challenge1)));
