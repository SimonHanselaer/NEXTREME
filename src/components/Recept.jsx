import React from "react";
import { useState } from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { observer, inject } from "mobx-react";
import Ingredienten from "./Ingredienten";
import Bereiding from "./Bereiding";
import { useHistory } from "react-router-dom";

const Recept = (props) => {
    const challenge = props.challenge;
    const grens = props.grens;
    const challengeId = props.challengeId;
    const {databaseStore} = props;
    const [status, setStatus] = useState(true);

    let history = useHistory();

    return (
        <>
            <h1 className="header-1">{challenge.naam}</h1>
            <section>
                <h2 className="visually-hidden">Info</h2>
                <img src="" alt=""/>
                <article>
                    <h3 className="small">Personen</h3>
                    <p className="accent">{challenge.personen}</p>
                </article>
                <article>
                    <h3 className="small">Werk tijd</h3>
                    <p className="accent">{challenge.werkTijd}</p>
                </article>
                <article>
                    <h3 className="small">Totale tijd</h3>
                    <p className="accent">{challenge.totaleTijd}</p>
                </article>
            </section>
            <section>
                <button className={status ? "header-1 noButton" : "noButton"} onClick={() => setStatus(true)}>Ingrediënten</button>
                <button className={status ? "noButton" : "header-1 noButton"} onClick={() => setStatus(false)}>Bereiding</button>
            </section>
            <section>
            {status ? (
                <Ingredienten ingredienten={challenge.ingrediënten} />
            ) : (
                <Bereiding stappen={challenge.stappen} />
            ) }
            </section>
            <button className="button-1" onClick={() => {
                const props = {
                    challenge: 'challenge1',
                    grens: grens,
                    id: challengeId,
                    uid: localStorage.uid,
                    status: 'gecomplete',
                    naam: challenge.naam
                  }
        
                  databaseStore.updateCompletedChallenges(props);
                  history.push("/");
            }}>Uitdaging compleet!</button>
        </>
    );

    
}

export default withAuthentication(observer(Recept));