import React from "react";
import withAuthentication from "./../components/auth/WithAuthentication"
import { useHistory } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { useEffect, useState } from "react";

import faon from "../assets/img/challenge3/faon.png";

const ResultatenChallenge3 = (props) => {
    const {databaseStore} = props;
    const {regio} = props;
    const {answer} = props;


    const [results, setResults] = useState("");

    useEffect(() => {
        const getResults = async () => {
            let results = await databaseStore.getResults();
            setResults(results);
        }

        getResults();
    }, [databaseStore, results]);

    return (
        <>
            <h1>Resultaten</h1>
             {
                results ? (
                    Object.keys(results).map(key => {
                        let resultA = results[key].antwoorden.optieA.procent;
                        let resultB = results[key].antwoorden.optieB.procent;
                        if(resultA > resultB){
                            if(answer === "Optie A"){
                                return (
                                    <>
                                        <div key={resultA + 20}>{results[key].name + ": " + resultA + "%"}
                                            <p key={resultB}>{results[key].antwoorden.optieA.title}</p>
                                            <p>jij behoort tot deze stad!</p>
                                            <img src={faon} alt="header foto evenement"/>
                                            <p>FAON</p>
                                            <p>Performance /.../ 16+ </p>
                                            <a href="http://www.nextfestival.eu/nl/evenement/faon">pijltje</a>
                                        </div>
                                       
                                    </>
                                )
                            }else{
                                return (
                                    <>
                                        <div key={resultA + 20}>{results[key].name + ": " + resultA + "%"}
                                            <p key={resultB}>{results[key].antwoorden.optieA.title}</p>
                                        </div>
                                       
                                    </>
                                )
                            }
                        }else{
                            if(answer === "Optie B"){
                                return (
                                    <>
                                        <div key={resultA}>{results[key].name + ": " + resultB + "%"}
                                            <p key={resultB + 20}>{results[key].antwoorden.optieB.title}</p>
                                            <p>jij behoort tot deze stad!</p>
                                            <img src="" alt="header foto evenement"/>
                                            <p>FAON</p>
                                            <p>Performance /.../ 16+ </p>
                                            <a href="http://www.nextfestival.eu/nl/evenement/faon">pijltje</a>
                                        </div>
                                    </>
                                )
                            }else{
                                return (
                                    <>
                                        <div key={resultA}>{results[key].name + ": " + resultB + "%"}
                                            <p key={resultB + 20}>{results[key].antwoorden.optieB.title}</p>
                                        </div>
                                    </>
                                )
                            } 
                        }
                    })
                ) : (
                    <p>Loading...</p>
                )
            }
        </>
    )
}

export default inject(`databaseStore`)(withAuthentication(observer(ResultatenChallenge3)));