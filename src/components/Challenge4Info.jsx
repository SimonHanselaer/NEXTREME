import React from "react";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";

import withAuthentication from "../components/auth/WithAuthentication";
import { observer, inject } from "mobx-react";

const Recept = ({ databaseStore }) => {
    let history = useHistory();

    const {id} = useParams();
    const {grens} = useParams();
    const [status, setStatus] = useState(true);
    const [city, setCity] = useState("");
    const [info, setInfo] = useState("")

    useEffect(() => {
        const componentDidMount = async () => {
            switch (id) {
                case '1':
                    setCity("Kortrijk")
                    break;

                case '2':
                    setCity("Doornik")
                    break;

                case '3':
                    setCity("Lille")
                    break;
            
                default:
                    break;
            }

            const props = {
                grens: grens,
                id: id
            }
            
            console.log('test');
            const info = await databaseStore.getInfo(props);
            setInfo(info);
        }
    
        componentDidMount();
    }, [databaseStore, grens, id])





    return (
        <>
            <h1>{city}</h1>
            <section>
                <button onClick={() => setStatus(true)}>Wist je dat</button>
                <button onClick={() => setStatus(false)}>Voorstelling</button>
            </section>
            <section>
            {status ? (
                <>
                    <p>{info.text}</p>
                </>
            ) : (
                <p>{info.voorstelling}</p>
            ) }
            </section>
            <button onClick={() => history.push("/")}>Home</button>
        </>
    );

    
}

export default inject(`databaseStore`)(withAuthentication(observer(Recept)));