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
    let duplicates1 = [];
    let duplicates2 = [];

    const [results, setResults] = useState("");

    useEffect(() => {
        const getResults = async () => {
            let results = await databaseStore.getResults();
            setResults(results);
        }
        console.log('test');

        getResults();
    }, [databaseStore]);

    // const test = (prop) => {
    //     if(prop === "vraag 1"){
    //         if(duplicates1.length === 1){
    //             console.log(duplicates1[0]);
    //             if(answer === "Optie A"){
    //                 return (
    //                     <>
    //                         <div>{duplicates1[0].regio + ": " + duplicates1[0].procent + "%"}
    //                             <p>{duplicates1[0].title}</p>
    //                             <p>jij behoort tot deze stad!</p>
    //                             <img src={faon} alt="header foto evenement"/>
    //                             <p>FAON</p>
    //                             <p>Performance /.../ 16+ </p>
    //                             <a href="http://www.nextfestival.eu/nl/evenement/faon">pijltje</a>
    //                         </div>
    //                     </>
    //                 )
    //             }else{
    //                 return (
    //                     <>
    //                         <div>{duplicates1[0].regio + ": " + duplicates1[0].procent + "%"}
    //                             <p>{duplicates1[0].title}</p>
    //                         </div>
    //                     </>
    //                 )
    //             }    
    //         }else{
    //             if(answer === "Optie A"){
    //                 return (
    //                     <>
    //                         <div>{duplicates1[0].regio + ": " + duplicates1[0].procent + "%"}
    //                             <p>{duplicates1[0].title}</p>
    //                             <p>jij behoort tot deze stad!</p>
    //                             <img src={faon} alt="header foto evenement"/>
    //                             <p>FAON</p>
    //                             <p>Performance /.../ 16+ </p>
    //                             <a href="http://www.nextfestival.eu/nl/evenement/faon">pijltje</a>
    //                         </div>
    //                     </>
    //                 )
    //             }else{
    //                 return (
    //                     <>
    //                         <div>{duplicates1[1].regio + ": " + duplicates1[1].procent + "%"}
    //                             <p>{duplicates1[1].title}</p>
    //                         </div>
    //                     </>
    //                 )
    //             }    
    //         }
    //     }else{
    //         if(duplicates2.length === 1){
    //             console.log(duplicates2[0]);
    //             if(answer === "Optie B"){
    //                 return (
    //                     <>
    //                         <div>{duplicates2[0].regio + ": " + duplicates2[0].procent + "%"}
    //                             <p>{duplicates2[0].title}</p>
    //                             <p>jij behoort tot deze stad!</p>
    //                             <img src={faon} alt="header foto evenement"/>
    //                             <p>FAON</p>
    //                             <p>Performance /.../ 16+ </p>
    //                             <a href="http://www.nextfestival.eu/nl/evenement/faon">pijltje</a>
    //                         </div>
    //                     </>
    //                 )
    //             }else{
    //                 return (
    //                     <>
    //                         <div>{duplicates2[0].regio + ": " + duplicates2[0].procent + "%"}
    //                             <p>{duplicates2[0].title}</p>
    //                         </div>
    //                     </>
    //                 )
    //             }    
    //         }else{
    //             if(answer === "Optie B"){
    //                 return (
    //                     <>
    //                         <div>{duplicates2[0].regio + ": " + duplicates2[0].procent + "%"}
    //                             <p>{duplicates2[0].title}</p>
    //                             <p>jij behoort tot deze stad!</p>
    //                             <img src={faon} alt="header foto evenement"/>
    //                             <p>FAON</p>
    //                             <p>Performance /.../ 16+ </p>
    //                             <a href="http://www.nextfestival.eu/nl/evenement/faon">pijltje</a>
    //                         </div>
    //                     </>
    //                 )
    //             }else{
    //                 return (
    //                     <>
    //                         <div>{duplicates2[1].regio + ": " + duplicates2[1].procent + "%"}
    //                             <p>{duplicates2[1].title}</p>
    //                         </div>
    //                     </>
    //                 )
    //             }    
    //         }
    //     }
        
    // }

    return (
        <>
            <h1>Resultaten</h1>
             {
                results ? (
                    Object.keys(results).map(key => {
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
                    console.log(result);
                    return (
                        <>
                            <div key={key}>{result.regio + ": " + result.procent + "%"}
                                <p>{result.title}</p>
                            </div>
                        </>
                    )
                    // if(result.title === "vraag 1"){
                    //     let vraag1 = result.title;
                    //     duplicates1.push(result);
                    //     // // console.log(duplicates1);
                    //     // return(
                    //     //     {
                    //     //         test(result.title);
                    //     //     }
                    //     // )
                        
                    // }else{
                    //     duplicates2.push(result);
                    //     // console.log(duplicates2);
                    //     test("vraag 2");
                       
                    // }
                })
            }
        </>
    )
}

export default inject(`databaseStore`)(withAuthentication(observer(ResultatenChallenge3)));