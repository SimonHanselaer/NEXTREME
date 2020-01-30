import React from "react";
import { useState } from "react";
import Ingredienten from "./Ingredienten";
import Bereiding from "./Bereiding";

const Recept = (props) => {
    const challenge = props.challenge;
    const [status, setStatus] = useState(true);

    return (
        <>
            <h1>{challenge.naam}</h1>
            <section>
                <h2>Info</h2>
                <img src="" alt=""/>
                <article>
                    <h3>Personen</h3>
                    <p>{challenge.personen}</p>
                </article>
                <article>
                    <h3>Werk tijd</h3>
                    <p>{challenge.werkTijd}</p>
                </article>
                <article>
                    <h3>Totale tijd</h3>
                    <p>{challenge.totaleTijd}</p>
                </article>
            </section>
            <section>
                <button onClick={() => setStatus(true)}>Ingrediënten</button>
                <button onClick={() => setStatus(false)}>Bereiding</button>
            </section>
            <section>
            {status ? (
                <Ingredienten ingredienten={challenge.ingrediënten} />
            ) : (
                <Bereiding stappen={challenge.stappen} />
            ) }
            </section>
        </>
    );

    
}

export default Recept;