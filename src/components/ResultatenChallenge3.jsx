import React from "react";
import withAuthentication from "./../components/auth/WithAuthentication"
import { useHistory } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { useEffect, useState } from "react";

// import faon from "../assets/img/challenge3/faon.png"; 
import faon from "../assets/img/faon.png";

const ResultatenChallenge3 = (props) => {
    const {databaseStore} = props;
    const {regio} = props;
    const {answer} = props;


    let highest;
 
    let rankResults = [];
    let highestProcent = [];
    let highestProcentB = [];
    console.log(highestProcent);

    const [results, setResults] = useState("");

    useEffect(() => {
        const getResults = async () => {
            let results = await databaseStore.getResults();
            console.log(results);
            setResults(results);
        }
        console.log('test');

        getResults();
    }, [databaseStore]);

    return (
        <>
            <h1>Resultaten</h1>
             {
                results ? (
                    Object.keys(results).map(key => {
                        console.log(results);
                        let resultA = results[key].antwoorden.optieA.count;
                        let resultB = results[key].antwoorden.optieB.count;
                        
                        if(resultA > resultB){
                            let title = results[key].antwoorden.optieA.title;
                            let regio = results[key].antwoorden.optieA.regio;
                            let totalCount = Number(resultA + resultB);
                            console.log(totalCount, regio, title);
                            let procent = Math.round(resultA / totalCount * 100);
                            rankResults.push({title: title, regio: regio, procent: procent});
                            console.log(rankResults);
                        }else{
                            let title = results[key].antwoorden.optieB.title;
                            let regio = results[key].antwoorden.optieB.regio;
                            let totalCount = Number(resultA + resultB);
                            console.log(totalCount, regio, title);
                            let procent = Math.round(resultB / totalCount * 100);
                            rankResults.push({title: title, regio: regio, procent: procent});
                            console.log(rankResults);
                        }
                    })
                ) : (
                    <p>Loading...</p>
                )
            }
            
            {
                //om de procent te ordenen van hoog nr laag
                rankResults.sort((a,b) => b.procent - a.procent).map((result, key) => {
                    if(result.title === "antwoord 1" ){
                        console.log(result.procent);
                        highestProcent.push(Number(result.procent));
                        //
                        if (highestProcent.length > 0){
                            highest = Math.max(...highestProcent);
                            console.log(highest);

                            if(highest === result.procent && answer === "Optie A"){
                                return (
                                    <>
                                        <div key={key}>{result.regio + ": " + result.procent + "%"}
                                            <p>{result.title}</p>
                                            <p>jij behoort tot deze stad!</p>
                                            <img src={faon} alt="header foto evenement"/>
                                            <p>FAON</p>
                                            <p>Performance /.../ 16+ </p>
                                            <a href="http://www.nextfestival.eu/nl/evenement/faon">pijltje</a>
                                        </div>
                                    </>
                                )
                            }else if(highest != result.procent && answer === "Optie A"){
                                return (
                                    <>
                                        <div key={key}>{result.regio + ": " + result.procent + "%"}
                                            <p>{result.title}</p>
                                        </div>
                                    </>
                                )
                            }else{
                                return (
                                    <>
                                        <div key={key}>{result.regio + ": " + result.procent + "%"}
                                            <p>{result.title}</p>
                                        </div>
                                    </>
                                )
                            }
                        }
                    }
                    
                    if(result.title === "antwoord 2"){ 
                        console.log(result.procent);
                        highestProcentB.push(Number(result.procent));
                        //
                        if (highestProcentB.length > 0){
                            highest = Math.max(...highestProcentB);
                            console.log(highest);

                            if(highest === result.procent && answer === "Optie B"){
                                return (
                                    <>
                                        <div key={key}>{result.regio + ": " + result.procent + "%"}
                                            <p>{result.title}</p>
                                            <p>jij behoort tot deze stad!</p>
                                            <img src={faon} alt="header foto evenement"/>
                                            <p>FAON</p>
                                            <p>Performance /.../ 16+ </p>
                                            <a href="http://www.nextfestival.eu/nl/evenement/faon">pijltje</a>
                                        </div>
                                    </>
                                )
                            }else if(highest != result.procent && answer === "Optie B"){
                                return (
                                    <>
                                        <div key={key}>{result.regio + ": " + result.procent + "%"}
                                            <p>{result.title}</p>
                                        </div>
                                    </>
                                )
                            }else{
                                return (
                                    <>
                                        <div key={key}>{result.regio + ": " + result.procent + "%"}
                                            <p>{result.title}</p>
                                        </div>
                                    </>
                                )
                            }
                        }
                    }  
                })
            }
        </>
    )
}

export default inject(`databaseStore`)(withAuthentication(observer(ResultatenChallenge3)));