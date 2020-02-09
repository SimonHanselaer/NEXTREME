import React from "react";
import withAuthentication from "./../components/auth/WithAuthentication"
import { useHistory } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { useEffect, useState } from "react";

const ResultatenChallenge3 = (props) => {
    const {databaseStore} = props;
    const {regio} = props;
    const {answer} = props;


    const [results, setResults] = useState("");

    useEffect(() => {
      
        const getResults = async (answer, regio) => {
            const props = {
                regio: regio,
                answer: answer
            }

            let results = await databaseStore.getResults(regio);
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
                        const resultA = results[key].antwoorden.optieA.procent;
                        const resultB = results[key].antwoorden.optieB.procent;
                        if(resultA > resultB){
                            return (
                                <>
                                    <p key={resultA + 20}>{results[key].name + ": " + resultA + "%"}</p>
                                    <p key={resultB}>{results[key].antwoorden.optieA.title}</p>
                                </>
                            )
                        }else{
                            return (
                                <>
                                    <p key={resultA}>{results[key].name + ": " + resultB + "%"}</p>
                                    <p key={resultB + 20}>{results[key].antwoorden.optieB.title}</p>
                                </>
                            )
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