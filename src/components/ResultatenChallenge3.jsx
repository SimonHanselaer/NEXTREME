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
                        if(answer === "Optie A"){
                            return (
                                <p key={key}>{results[key].name + ": " + results[key].antwoorden.optieA + "%"}</p>
                            )
                        }else{
                            return (
                                <p key={key}>{results[key].name + ": " + results[key].antwoorden.optieB + "%"}</p>
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