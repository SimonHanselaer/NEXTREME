import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import withAuthentication from "../components/auth/WithAuthentication";
import { observer, inject } from "mobx-react";

import TopBar from "../components/TopBar";
import Tabbar from "../components/Tabbar";

import styles from "./Challenge4Info.module.css";
import stylesUi from "../styles/ui.module.css";

const Recept = ({ databaseStore }) => {

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
            console.log(grens, id);
            const info = await databaseStore.getInfo(props);
            setInfo(info);
        }
    
        componentDidMount();
    }, [databaseStore, grens, id])





    return (
        <>
            <TopBar title={city} />
            <section className={stylesUi.contentContainer}>
                <article>
                    <button className={status ? "noButton header1" : "noButton"} onClick={() => setStatus(true)}>Wist je dat</button>
                    <button className={status ? "noButton" : "noButton header1"} onClick={() => setStatus(false)}>Voorstelling</button>
                </article>
                <article className={`${styles.tekst} ${styles.card}`}>
                {status ? (
                    <>
                        <p>{info.text}</p>
                    </>
                ) : (
                    <p>{info.voorstelling}</p>
                ) }
                </article>
            </section>
            <Tabbar />
        </>
    );

    
}

export default inject(`databaseStore`)(withAuthentication(observer(Recept)));