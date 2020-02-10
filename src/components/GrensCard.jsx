import React from "react";
import { useHistory } from "react-router-dom";
import { inject, observer } from "mobx-react";

const GrensCard = (props, {dataStore}) => {
    const {name} = props;
    let history = useHistory();

    const selectChallenge = () => {
        //geen taal bij challenge 4
        //altijd beginnen bij 1 bij challenge 2

        //TODO: challenge 1: checken nog niet geaccepteerd of gebruiken we dit gewoon als een reminder dan?
        //TODO: challenge 3: kijken dat de vraag nog niet ingevuld is door de gebruiker
        
        let challenge;
        let challengeNumber;

        if (name !== "Taal") {
            challenge = Math.ceil(Math.random() * 4);
        } else {
            challenge = Math.ceil(Math.random() * 3);
        }

        if (challenge !== 2) {
            challengeNumber = Math.ceil(Math.random() * 3);
        } else {
            challengeNumber = 1;
        }
        
        history.push("/challenge" + challenge + "/" + name + "/" + challengeNumber);
    }

    return (
        <article>
            <h2>{name}grens</h2>
            <button onClick={() => selectChallenge()}>{name} grens</button>
        </article>
    )
}

export default inject(`dataStore`)(observer(GrensCard));