import React, {useState, useEffect} from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { observer, inject } from "mobx-react";
import { useParams, useHistory } from "react-router-dom";

const Challenge3 = ({databaseStore, dataStore}) => {
  console.log(useParams())
  let {grens} = useParams();
  let {id} = useParams();

  let history = useHistory();

  const [status, setStatus] = useState(false);
  const [count, setCount] = useState(1);

  const [challenge, setChallenge] = useState("");

  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const getQuestions = async () => {
      const props = {
        challenge: 3,
        grens: grens,
        id: id
      }

      let awaitingChallenge = await databaseStore.getChallenge(props);
      setChallenge(awaitingChallenge);

    }

    getQuestions();
  }, [databaseStore, grens, id]);

  const handleCompletedChallenge = (e) => {
   console.log(e);
   //TODO
   //data in realtime db steken
   //naar resultaten page gaan
  }

  if (!status) {
    return (
      <>
        <h1>{challenge.Naam}</h1>
        <p>Duid aan welke van de twee opties het beste bij jou aansluit. Hierna kom je meer te weten over andere steden.</p>
        <button onClick={() => setStatus(true)}>Start</button>
      </>
    ) 
  } else {
    return (
      <>
        <h1>{challenge.Naam}</h1>
        <button onClick={e => {
          handleCompletedChallenge(e.currentTarget.innerHTML);
          }}>{challenge.OptieA}</button>
        <button onClick={e => {
          handleCompletedChallenge(e.currentTarget.innerHTML);
          }}>{challenge.OptieB}</button>
      </>
    );
  }
};

export default inject(`databaseStore`, `dataStore`)(withAuthentication(observer(Challenge3)));
