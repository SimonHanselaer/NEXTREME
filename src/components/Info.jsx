import React from "react";

const Info = (props) => {
    const challenge = props.challenge;

    return (
        <>
            <h1>{challenge.naam}</h1>
            <p>{challenge.omschrijving}</p>
        </>
    );

    
}

export default Info;