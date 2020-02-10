import React from "react";
import { useState } from "react";
import { useEffect } from "react";

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
            <h1>{challenge.naam}</h1>
            <p>{scrabbledWord}</p>

            {
                check !== "Juist!" ? (
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="jouw antwoord" onChange={e => setAnswer(e.currentTarget.value)}/>
                        <button type="submit">Check</button>
                    </form>
                ) : (
                    <></>
                )
            }
            <p>{check}</p>
        </>
    );
}

export default Scrabble;