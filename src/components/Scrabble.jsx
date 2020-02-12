import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import TopBar from "./TopBar";
import stylesUi from "../styles/ui.module.css";
import stylesTypo from "../styles/typo.module.css";

const Scrabble = (props) => {
    const challenge = props.challenge;

    const [scrabbledWord, setScrabbledWord] = useState("")
    const [answer, setAnswer] = useState("");
    const [check, setCheck] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (answer.toUpperCase() === challenge.woord.toUpperCase()) {
            setCheck("Juist!")
        } else {
            setCheck("Nope! probeer opnieuw")
        }
    }

    useEffect(() => {
        const scrabbleWord = () => {
            let scrabble = challenge.woord;
            setScrabbledWord(scrabble.split('').sort(() => {
                return .5 - Math.random();
            }).toString().replace(/,/g,''));
        }
        console.log('test');
        scrabbleWord();
    }, [challenge.woord]);
    
    return (
        <>
            <TopBar title={challenge.naam} />
            <div className={stylesUi.contentContainer}>
                <p>{scrabbledWord}</p>
                {
                    check !== "Juist!" ? (
                        <form onSubmit={handleSubmit}>
                            <input className={stylesUi.formInput} type="text" placeholder="jouw antwoord" onChange={e => setAnswer(e.currentTarget.value)}/>
                            <button type="submit" className={`${stylesTypo.header1} ${stylesUi.button1}`}>Check</button>
                        </form>
                    ) : (
                        <></>
                    )
                }
                <p>{check}</p>

            </div>
        </>
    );
}

export default Scrabble;