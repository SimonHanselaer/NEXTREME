import React from "react";
import { useHistory } from "react-router-dom";
import { inject, observer } from "mobx-react";

const GrensCard = (props, {dataStore}) => {
    const {name} = props;
    let history = useHistory();

    const selectChallenge = () => {
        const challenge = Math.ceil(Math.random() * 4);
        const challengeNumber = Math.ceil(Math.random() * 3);
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