import React from "react";

import TopBar from "./TopBar";

const Info = (props) => {
    const challenge = props.challenge;

    return (
        <>
            <TopBar title={challenge.naam} />
            <p>{challenge.omschrijving}</p>
        </>
    );

    
}

export default Info;