import React, {useState, useEffect} from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { observer, inject } from "mobx-react";
import { useParams, useHistory } from "react-router-dom";

import Resultaten from "../components/ResultatenChallenge3";

import main from "../assets/img/challenge3/main.png";

const Challenge3 = ({databaseStore}) => {
  let {grens} = useParams();
  let {id} = useParams();

  console.log(grens);

  let totalProcentA;
  let totalProcentB;

  let history = useHistory();

  const [status, setStatus] = useState(false);
  const [count, setCount] = useState(1);

  const [challenge, setChallenge] = useState("");
  const [regio, setRegio] = useState("");
  const [results, setResults] = useState("");
  const [answer, setAnswer] = useState("");
  //
  const [procentA, setProcentA] = useState("");
  const [procentB, setProcentB] = useState("");

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

    const getResults = async () => {
      let results = await databaseStore.getResults();
      // console.log(results);
      setResults(results);
    }

    console.log('test');
    //
    getRegio();
    //
    getResults();
    //
    getQuestions();
  }, [databaseStore, grens, id]);
 

  //mag niet in useEffect want daar is regio niet gekent
  const getResultProcentA = async () => {
    // console.log(regio.Regio);
    const props = {
      regio: regio.Regio
    }
    let resultProcentA = await databaseStore.getResultProcentA(props);
    console.log(resultProcentA.procent);
    let procent0A = resultProcentA.procent;
    // console.log(procent0A);
    setProcentA(procent0A);
  }

  const getResultProcentB = async () => {
    const props = {
      regio: regio.Regio
    }
    let resultProcentB = await databaseStore.getResultProcentB(props);
    // console.log(resultProcentB);
    let procent0B = resultProcentB.procent;
    // console.log(procent0B);
    setProcentB(procent0B);
  }

  const preloader = async (e)=>{
    console.log("preloading");
    await getResultProcentA();
    console.log(procentA);
    await getResultProcentB();
    console.log(procentB);
    console.log("preloaded");
  }

  const handleCompletedChallenge = async (e) => {
    //antwoord + regio user 
      // console.log(e);
      // console.log(regio.Regio);
      // console.log(procentA);
      // console.log(procentB);
    
    //data in db steken
    if(e === "Optie A"){  
      //bestaand procent + 10 doen
      totalProcentA = await Number(procentA) + 10;
      console.log(totalProcentA);
      const props = {
        regio: regio.Regio,
        answer: totalProcentA
      }
      databaseStore.newResultA(props);
    }else{
      totalProcentB = await Number(procentB) + 10;
      console.log(totalProcentB);
      const props = {
        regio: regio.Regio,
        answer: totalProcentB
      }
      databaseStore.newResultB(props);
    }
  }
  

  if (!status && count > 0) {
    return (
      <>
        <h1>Leer over je medemens.</h1>
        <img src={main} alt="Een afbeelding met een knipoog naar de uitdaging."/>
        <p>Duid aan welke van de twee opties het beste bij jou aansluit. Hierna kom je meer te weten over andere steden.</p>
        <button onClick={() => setStatus(true)}>Start</button>
      </>
    ) 
  } else {
    switch (count) {
      case 1:
      preloader();
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
            <Resultaten regio={regio.Regio} answer={answer}  databaseStore={databaseStore}/>
          </>
        );
      default:
        break;
    }
  }
};

export default inject(`databaseStore`)(withAuthentication(observer(Challenge3)));
