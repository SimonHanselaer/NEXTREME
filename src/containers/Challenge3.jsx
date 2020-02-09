import React, {useState, useEffect} from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { observer, inject } from "mobx-react";
import { useParams, useHistory, NavLink } from "react-router-dom";

import Resultaten from "../components/ResultatenChallenge3";

const Challenge3 = ({databaseStore, dataStore}) => {
  let {grens} = useParams();
  let {id} = useParams();

  let history = useHistory();

  const [status, setStatus] = useState(false);
  const [count, setCount] = useState(1);

  const [challenge, setChallenge] = useState("");
  const [regio, setRegio] = useState("");

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

    const getRegio = async () => {
      let regio = await databaseStore.getRegio(localStorage.uid);
      setRegio(regio);
    }

    getRegio();
    getQuestions();
  }, [databaseStore, grens, id]);

  const handleCompletedChallenge = (e) => {
    //antwoord + regio user meegeven
   console.log(e);
   console.log(regio.Regio);
   //TODO
   //data in realtime db steken
  }


  if (!status && count > 0) {
    return (
      <>
        <h1>Leer over je medemens.</h1>
        <p>Duid aan welke van de twee opties het beste bij jou aansluit. Hierna kom je meer te weten over andere steden.</p>
        <button onClick={() => setStatus(true)}>Start</button>
      </>
    ) 
  } else {
    switch (count) {
      case 1:
        return (
          <>
            <h1>{challenge.Naam}</h1>
              <button onClick={e => {
                setCount(count + 1);
                setAnswer(e.currentTarget.innerHTML);
                handleCompletedChallenge(e.currentTarget.innerHTML);
                }}>{challenge.OptieA}
              </button>
              <button onClick={e => {
                setCount(count + 1);
                setAnswer(e.currentTarget.innerHTML);
                handleCompletedChallenge(e.currentTarget.innerHTML);
                }}>{challenge.OptieB}
              </button>
          </>
        );
      case 2:
        return (
          <>
            <h1>Resultaten</h1>
            <p>{regio.Regio}</p>
            <p>{answer}</p>
            {/* TODO
              Data uit realtime db halen
            */}
          </>
        );
      default:
        break;
    }
  }
};

export default inject(`databaseStore`, `dataStore`)(withAuthentication(observer(Challenge3)));
