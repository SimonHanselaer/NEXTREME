import React, {useState, useEffect} from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { observer, inject } from "mobx-react";
import { useParams, useHistory } from "react-router-dom";

const Challenge2 = ({databaseStore, dataStore}) => {
  let {grens} = useParams();
  let {id} = useParams();

  let history = useHistory();

  const [status, setStatus] = useState(false);
  const [count, setCount] = useState(1);

  const [challenge, setChallenge] = useState("");

  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");

  useEffect(() => {
    const getQuestions = async () => {
      const props = {
        challenge: 2,
        grens: grens,
        id: id
      }

      let awaitingChallenge = await databaseStore.getChallenge(props);
      setChallenge(awaitingChallenge);

    }

    getQuestions();
  }, [databaseStore, grens, id]);

  const handleCompletedChallenge = () => {
    if (dataStore.roomId !== 0) {

      const props = {
        roomId: dataStore.roomId,
        userUid: localStorage.uid,
        vraag1: {
          antwoord: answer1,
          vraag: challenge.vraag1.vraag
        },
        vraag2: {
          antwoord: answer2, 
          vraag: challenge.vraag2.vraag
        },
        vraag3: {
          antwoord: answer3,
          vraag: challenge.vraag3.vraag
        },
        grens: grens,
        nummer: id
      }

      databaseStore.updateAnswers(props);

      history.push("/room/" + dataStore.roomId);
      dataStore.handleAnswerQuestions(0);
    } else {

      const props = {
        vraag1: {
          antwoord: answer1,
          vraag: challenge.vraag1.vraag
        },
        vraag2: {
          antwoord: answer2,
          vraag: challenge.vraag2.vraag
        },
        vraag3: {
          antwoord: answer3,
          vraag: challenge.vraag3.vraag
      }
      }

      const propGrens = grens;

      databaseStore.lookingForMatch(props, propGrens);
      history.push("/");
    }
  }


  if (!status && count > 0) {
    return (
      <>
        <h1>{challenge.naam}</h1>
        <p>Je wordt gematcht met een andere gebruiker. Jullie krijgen beide dezelfde vragen, zo leer je elkaar beter kennen. Als het klikt is er de mogelijkheid om te chatten.</p>
        <button onClick={() => setStatus(true)}>Starten</button>
      </>
    ) 
  } else {
    switch (count) {
      case 1:
        return (
          <>
            <h1>{challenge.vraag1.vraag}</h1>
            <button onClick={e => {
              setCount(count + 1);
              setAnswer1(e.currentTarget.innerHTML);
              }}>{challenge.vraag1.antwoord1}</button>
            <button onClick={e => {
              setCount(count + 1);
              setAnswer1(e.currentTarget.innerHTML);
              }}>{challenge.vraag1.antwoord2}</button>
          </>
        );

        case 2:
        return (
          <>
            <h1>{challenge.vraag2.vraag}</h1>
            <button onClick={e => {
              setCount(count + 1);
              setAnswer2(e.currentTarget.innerHTML);
              }}>{challenge.vraag2.antwoord1}</button>
            <button onClick={e => {
              setCount(count + 1);
              setAnswer2(e.currentTarget.innerHTML);
              }}>{challenge.vraag2.antwoord2}</button>
          </>
        );

        case 3:
        return (
          <>
            <h1>{challenge.vraag3.vraag}</h1>

            <button onClick={e => {
              setCount(count + 1);
              setAnswer3(e.currentTarget.innerHTML);
              }}>{challenge.vraag3.antwoord1}</button>
            <button onClick={e => {
              setCount(count + 1);
              setAnswer3(e.currentTarget.innerHTML);
              }}>{challenge.vraag3.antwoord2}</button>
          </>
        );
        
        case 4:
          return (
            <>
            <h1>Even wachten...</h1>
            <p>op de match zijn antwoorden. Deze vind je terug onder ‘Mijn uitdagingen’.</p>
            <h2>Terwijl je wacht...</h2>
            <p>Misschien interesseert deze voorstelling je.</p>
            <p>Multitud</p>
            <p>Tamara Cubas</p>
            <p>In al hun verschillen realiseren de dansers iets prachtigs, iets waar wij als samenleving zo veel moeite mee hebben: zonder elkaar te verstaan, begrijpen ze elkaar. </p>
            <a href="http://www.nextfestival.eu" target="_blank">meer op nextfestival.eu</a>

            <button onClick={() => handleCompletedChallenge()}>Doorgaan</button>
            </>
          )
    
      default:
        break;
    }
  }
}

export default inject(`databaseStore`, `dataStore`)(withAuthentication(observer(Challenge2)));
