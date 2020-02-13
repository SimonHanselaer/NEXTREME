import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import TopBar from "./TopBar";
import stylesUi from "../styles/ui.module.css";
import stylesTypo from "../styles/typo.module.css";
import styles from "./Scrabble.module.css";
import { useHistory, useParams } from "react-router-dom";

import img from "../assets/img/template1Fruit.png";

const Scrabble = (props) => {
    const {id} = useParams();
    const challenge = props.challenge;
    let history = useHistory();

    const [scrabbledWord, setScrabbledWord] = useState("")
    const [answer, setAnswer] = useState("");
    const [check, setCheck] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (answer.toUpperCase() === challenge.woord.toUpperCase()) {
            history.push("/info/" + id + "/Taal");
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
        scrabbleWord();
    }, [challenge.woord]);
    
    return (
        <>
            <TopBar title={challenge.naam} />
            <div className={styles.contentContainer}>
                <img src={img} alt="" className={styles.img}/>
                <p className={styles.scrabbled}>{scrabbledWord}</p>
                {
                    check !== "Juist!" ? (
                        <form onSubmit={handleSubmit}>
                            <input className={`${stylesUi.formInput} ${stylesTypo.input}`} type="text" placeholder="Jouw antwoord" onChange={e => setAnswer(e.currentTarget.value)}/>
                            <p className={stylesTypo.detail}>{check}</p>
                            <button type="submit" className={`${stylesTypo.header1} ${stylesUi.button1}`}>Check</button>
                        </form>
                    ) : (
                        <></>
                    )
                }

            </div>
        </>
    );
}

export default Scrabble;