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

    // console.log(answer);
    let rankResults = [];

    const [results, setResults] = useState("");

    useEffect(() => {
        const getResults = async () => {
            let results = await databaseStore.getResults();
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
                        console.log(key);
                        let resultA = results[key].antwoorden.optieA.procent;
                        let resultB = results[key].antwoorden.optieB.procent;
                        if(resultA > resultB){
                            rankResults.push(results[key].antwoorden.optieA);
                            // console.log(rankResults);
                        }else{
                            rankResults.push(results[key].antwoorden.optieB);
                            // console.log(rankResults);
                        }
                    })
                ) : (
                    <p>Loading...</p>
                )
            }
            {
                //om de procenten te ordenen van hoog nr laag
                rankResults.sort((a,b) => b.procent - a.procent).map((result, key) => {
                    console.log(key);
                    //deel 0 van array
                    if(result.title === rankResults[0].title && answer === "Optie A" && result.procent === rankResults[0].procent && result.title === "vraag 1"){
                        return (
                            <>
                                <div key={key*1}>{result.regio + ": " + result.procent + "%"}
                                    <p>{result.title}</p>
                                    <p>jij behoort tot deze stad!</p>
                                    <img src={faon} alt="header foto evenement"/>
                                    <p>FAON</p>
                                    <p>Performance /.../ 16+ </p>
                                    <a href="http://www.nextfestival.eu/nl/evenement/faon">pijltje</a>
                                </div>
                            </>
                        )
                    }
                    if(result.title === rankResults[0].title && answer === "Optie A" && result.procent === rankResults[1].procent && result.title === "vraag 1"){
                        return (
                            <>
                                 <div key={key*2}>{result.regio + ": " + result.procent + "%"}
                                     <p>{result.title}</p>
                                 </div>
                            </>
                        )
                    }

                    if(result.title !== rankResults[0].title && answer === "Optie A" && result.title === "vraag 2"){
                        return (
                            <>
                                 <div key={key*3}>{result.regio + ": " + result.procent + "%"}
                                     <p>{result.title}</p>
                                 </div>
                            </>
                        )
                    }
                    if(result.title !== rankResults[0].title && answer === "Optie B" && result.title === "vraag 1"){
                        return (
                            <>
                                 <div key={key*4}>{result.regio + ": " + result.procent + "%"}
                                     <p>{result.title}</p>
                                 </div>
                            </>
                        )
                    }
                    if(result.title === rankResults[0].title && answer === "Optie B" && result.procent === rankResults[0].procent && result.title === "vraag 2"){
                        return (
                            <>
                                <div key={key*5}>{result.regio + ": " + result.procent + "%"}
                                    <p>{result.title}</p>
                                    <p>jij behoort tot deze stad!</p>
                                    <img src={faon} alt="header foto evenement"/>
                                    <p>FAON</p>
                                    <p>Performance /.../ 16+ </p>
                                    <a href="http://www.nextfestival.eu/nl/evenement/faon">pijltje</a>
                                </div>
                            </>
                        )
                    }
                    if(result.title === rankResults[0].title && answer === "Optie B" && result.procent === rankResults[1].procent && result.title === "vraag 2"){
                        return (
                            <>
                                <div key={key*6}>{result.regio + ": " + result.procent + "%"}
                                     <p>{result.title}</p>
                                 </div>
                            </>
                        )
                    }

                     //deel 1 van array
                     if(result.title === rankResults[1].title && answer === "Optie A" && result.procent === rankResults[1].procent && result.title === "vraag 1"){
                        return (
                            <>
                                <div key={key*7}>{result.regio + ": " + result.procent + "%"}
                                    <p>{result.title}</p>
                                    <p>jij behoort tot deze stad!</p>
                                    <img src={faon} alt="header foto evenement"/>
                                    <p>FAON</p>
                                    <p>Performance /.../ 16+ </p>
                                    <a href="http://www.nextfestival.eu/nl/evenement/faon">pijltje</a>
                                </div>
                            </>
                        )
                    }
                    if(result.title === rankResults[1].title && answer === "Optie A" && result.procent === rankResults[2].procent && result.title === "vraag 1"){
                        return (
                            <>
                                 <div key={key*8}>{result.regio + ": " + result.procent + "%"}
                                     <p>{result.title}</p>
                                 </div>
                            </>
                        )
                    }

                    if(result.title !== rankResults[1].title && answer === "Optie A" && result.title === "vraag 2"){
                        return (
                            <>
                                 <div key={key*9}>{result.regio + ": " + result.procent + "%"}
                                     <p>{result.title}</p>
                                 </div>
                            </>
                        )
                    }
                    if(result.title !== rankResults[1].title && answer === "Optie B" && result.title === "vraag 1"){
                        return (
                            <>
                                 <div key={key*10}>{result.regio + ": " + result.procent + "%"}
                                     <p>{result.title}</p>
                                 </div>
                            </>
                        )
                    }
                    if(result.title === rankResults[1].title && answer === "Optie B" && result.procent === rankResults[1].procent && result.title === "vraag 2"){
                        return (
                            <>
                                <div key={key*11}>{result.regio + ": " + result.procent + "%"}
                                    <p>{result.title}</p>
                                    <p>jij behoort tot deze stad!</p>
                                    <img src={faon} alt="header foto evenement"/>
                                    <p>FAON</p>
                                    <p>Performance /.../ 16+ </p>
                                    <a href="http://www.nextfestival.eu/nl/evenement/faon">pijltje</a>
                                </div>
                            </>
                        )
                    }
                    if(result.title === rankResults[1].title && answer === "Optie B" && result.procent === rankResults[2].procent && result.title === "vraag 2"){
                        return (
                            <>
                                <div key={key*12}>{result.regio + ": " + result.procent + "%"}
                                     <p>{result.title}</p>
                                 </div>
                            </>
                        )
                    }

                     //deel 2 van array
                     if(result.title === rankResults[2].title && answer === "Optie A" && result.procent === rankResults[2].procent && result.title === "vraag 1"){
                        return (
                            <>
                                <div key={key*13}>{result.regio + ": " + result.procent + "%"}
                                    <p>{result.title}</p>
                                    <p>jij behoort tot deze stad!</p>
                                    <img src={faon} alt="header foto evenement"/>
                                    <p>FAON</p>
                                    <p>Performance /.../ 16+ </p>
                                    <a href="http://www.nextfestival.eu/nl/evenement/faon">pijltje</a>
                                </div>
                            </>
                        )
                    }
                    if(result.title === rankResults[2].title && answer === "Optie A" && result.procent === rankResults[0].procent && result.title === "vraag 1"){
                        return (
                            <>
                                 <div key={key*14}>{result.regio + ": " + result.procent + "%"}
                                     <p>{result.title}</p>
                                 </div>
                            </>
                        )
                    }

                    if(result.title !== rankResults[2].title && answer === "Optie A" && result.title === "vraag 2"){
                        return (
                            <>
                                 <div key={key*15}>{result.regio + ": " + result.procent + "%"}
                                     <p>{result.title}</p>
                                 </div>
                            </>
                        )
                    }
                    if(result.title !== rankResults[2].title && answer === "Optie B" && result.title === "vraag 1"){
                        return (
                            <>
                                 <div key={key*16}>{result.regio + ": " + result.procent + "%"}
                                     <p>{result.title}</p>
                                 </div>
                            </>
                        )
                    }
                    if(result.title === rankResults[2].title && answer === "Optie B" && result.procent === rankResults[2].procent && result.title === "vraag 2"){
                        return (
                            <>
                                <div key={key*17}>{result.regio + ": " + result.procent + "%"}
                                    <p>{result.title}</p>
                                    <p>jij behoort tot deze stad!</p>
                                    <img src={faon} alt="header foto evenement"/>
                                    <p>FAON</p>
                                    <p>Performance /.../ 16+ </p>
                                    <a href="http://www.nextfestival.eu/nl/evenement/faon">pijltje</a>
                                </div>
                            </>
                        )
                    }
                    if(result.title === rankResults[2].title && answer === "Optie B" && result.procent === rankResults[0].procent && result.title === "vraag 2"){
                        return (
                            <>
                                <div key={key*18}>{result.regio + ": " + result.procent + "%"}
                                     <p>{result.title}</p>
                                 </div>
                            </>
                        )
                    }

                     // for (let i = 0; i < 2; i++) {
                    //     if(result.title === rankResults[i].title && answer === "Optie A" && result.procent === rankResults[i].procent && result.title === "vraag 1"){
                    //         return (
                    //             <>
                    //                 <div>{result.regio + ": " + result.procent + "%"}
                    //                     <p>{result.title}</p>
                    //                     <p>jij behoort tot deze stad!</p>
                    //                     <img src={faon} alt="header foto evenement"/>
                    //                     <p>FAON</p>
                    //                     <p>Performance /.../ 16+ </p>
                    //                     <a href="http://www.nextfestival.eu/nl/evenement/faon">pijltje</a>
                    //                 </div>
                    //             </>
                    //         )
                    //     }
                    //     if(result.title === rankResults[i].title && answer === "Optie A" && result.procent === rankResults[i+1].procent && result.title === "vraag 1"){
                    //         return (
                    //             <>
                    //                  <div key={key}>{result.regio + ": " + result.procent + "%"}
                    //                      <p>{result.title}</p>
                    //                  </div>
                    //             </>
                    //         )
                    //     }
    
                    //     if(result.title !== rankResults[i].title && answer === "Optie A" && result.title === "vraag 2"){
                    //         return (
                    //             <>
                    //                  <div key={key}>{result.regio + ": " + result.procent + "%"}
                    //                      <p>{result.title}</p>
                    //                  </div>
                    //             </>
                    //         )
                    //     }
                    //     if(result.title !== rankResults[i].title && answer === "Optie B" && result.title === "vraag 1"){
                    //         return (
                    //             <>
                    //                  <div key={key}>{result.regio + ": " + result.procent + "%"}
                    //                      <p>{result.title}</p>
                    //                  </div>
                    //             </>
                    //         )
                    //     }
                    //     if(result.title === rankResults[i].title && answer === "Optie B" && result.procent === rankResults[i].procent && result.title === "vraag 2"){
                    //         return (
                    //             <>
                    //                 <div>{result.regio + ": " + result.procent + "%"}
                    //                     <p>{result.title}</p>
                    //                     <p>jij behoort tot deze stad!</p>
                    //                     <img src={faon} alt="header foto evenement"/>
                    //                     <p>FAON</p>
                    //                     <p>Performance /.../ 16+ </p>
                    //                     <a href="http://www.nextfestival.eu/nl/evenement/faon">pijltje</a>
                    //                 </div>
                    //             </>
                    //         )
                    //     }
                    //     if(result.title === rankResults[i].title && answer === "Optie B" && result.procent === rankResults[i+1].procent && result.title === "vraag 2"){
                    //         return (
                    //             <>
                    //                 <div key={key}>{result.regio + ": " + result.procent + "%"}
                    //                      <p>{result.title}</p>
                    //                  </div>
                    //             </>
                    //         )
                    //     }
                    // }
                })
            }
        </>
    )
}

export default inject(`databaseStore`)(withAuthentication(observer(ResultatenChallenge3)));