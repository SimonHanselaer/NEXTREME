import React from "react";
import withAuthentication from "./../components/auth/WithAuthentication"
import { useParams, Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { useState } from "react";

import TopBar from "./../components/TopBar.jsx";
import styles from "./Room.module.css";
import stylesUI from "../styles/ui.module.css";
import stylesTypo from "../styles/typo.module.css";

const Room = ({databaseStore, dataStore}) => {
    let {id} = useParams();

    let history = useHistory();

    const [room, setRoom] = useState("");

    const [url, setUrl] = useState("");

    const [user, setUser] = useState("");

    useEffect(() => {
        const getRoom = async () => {
            let room = await databaseStore.getRoom(id);
            setRoom(room);

            switch (room.nextGrens) {
                case 'Cultuur':
                    setUrl("challenge2/" + room.nextGrens + "/" + room.grenzen.Cultuur); 
                    break;

                case 'Kunst':
                    setUrl("challenge2/" + room.nextGrens + "/" + room.grenzen.Kunst);
                    break;

                case 'Regio':
                    setUrl("challenge2/" + room.nextGrens + "/" + room.grenzen.Regio);
                    break;

                case 'Taal':
                    setUrl("challenge2/" + room.nextGrens + "/" + room.grenzen.Taal);
                    break;
            
                default:
                    break;
            }
                if (room.users.user1 === localStorage.uid) {
                    setUser("user1")
                } else {
                    setUser("user2")
                }
        }

        getRoom();
    }, [databaseStore, url, id]);

    const handleAnswerQuestions = () => {
        dataStore.handleAnswerQuestions(id);
    }

    const handleChat = () => {
        history.push("../chat/" + id);
    }

    const handleChatRequest = () => {
        const props = {
            uid: localStorage.uid,
            roomId: id
        }

        databaseStore.setChatRequest(props);
    }

    const handleRemoveMatch = () => {
        const props = {
            user1: room.users.user1,
            user2: room.users.user2,
            roomId: id
        }

        databaseStore.removeRoom(props);

        history.push('/');
    }

  return (
    <>
        <TopBar title="empty" />
        {/* <h1 className={stylesUI.visibilyHidden}>Room {id}</h1> */}
        <div className={stylesUI.contentContainer}>
            {room.chat === true ? (
                <>
                    <button onClick={() => handleChat()}>chat</button>
                    <Link to={"../" + url}>
                        <button onClick={() => {handleAnswerQuestions()}}>Answer more questions</button>
                    </Link>
                    <button onClick={() => handleRemoveMatch()}>Remove match</button>
                </>
            ) : (
                <>
                    {room.chat === localStorage.uid ? (
                        <>
                            <p>chat requested</p>
                            <Link to={"../" + url}>
                                <button onClick={() => {handleAnswerQuestions()}}>Answer more questions</button>
                            </Link>
                            <button onClick={() => handleRemoveMatch()}>Remove match</button>
                            {room && user !== "" ? (
                                <section>
                                    <p className={stylesTypo.header1}>Je match antwoordde</p>
                                    <div className={styles.widthCard}>
                                        <article className={styles.articleVraag}>
                                            <p className={stylesTypo.small}>{room.antwoorden[user].vraag1.vraag}</p>
                                            <p>{room.antwoorden[user].vraag1.antwoord}</p>
                                        </article>
                                        <div className={styles.longLineShort}></div>
                                        <article className={styles.articleVraag}>
                                            <p className={stylesTypo.small}>{room.antwoorden[user].vraag2.vraag}</p>
                                            <p>{room.antwoorden[user].vraag2.antwoord}</p>
                                        </article>
                                        <div className={styles.longLineShort}></div>
                                        <article className={styles.articleVraag}>
                                            <p className={stylesTypo.small}>{room.antwoorden[user].vraag3.vraag}</p>
                                            <p>{room.antwoorden[user].vraag3.antwoord}</p>
                                        </article>
                                    </div>
                                </section>
                            ) : (
                                <p>Aan het laden...</p>
                            )}
                        </>
                    ) : (
                        <>
                            {room && user !== "" ? (
                                <section>
                                    <p className={stylesTypo.header1}>Je match antwoordde</p>
                                    <div className={styles.widthCard}>
                                        <article className={styles.articleVraag}>
                                            <p className={stylesTypo.small}>{room.antwoorden[user].vraag1.vraag}</p>
                                            <p>{room.antwoorden[user].vraag1.antwoord}</p>
                                        </article>
                                        <div className={styles.longLineShort}></div>
                                        <article className={styles.articleVraag}>
                                            <p className={stylesTypo.small}>{room.antwoorden[user].vraag2.vraag}</p>
                                            <p>{room.antwoorden[user].vraag2.antwoord}</p>
                                        </article>
                                        <div className={styles.longLineShort}></div>
                                        <article className={styles.articleVraag}>
                                            <p className={stylesTypo.small}>{room.antwoorden[user].vraag3.vraag}</p>
                                            <p>{room.antwoorden[user].vraag3.antwoord}</p>
                                        </article>
                                    </div>
                                </section>
                            ) : (
                                <p>Aan het laden...</p>
                            )}
                            <button onClick={() => handleChatRequest()} className={styles.acceptButton}>Accepteer match</button>
                            <button onClick={() => handleRemoveMatch()} className={stylesUI.button2}>Weiger match</button>
                            <Link to={"../" + url}>
                                <button onClick={() => { handleAnswerQuestions() }} className={styles.questionButton}>Meer vragen</button>
                            </Link>
                        </>
                    )} 
                </>
            )}
        </div>
    </>
  );
};

export default inject(`databaseStore`, `dataStore`)(withAuthentication(observer(Room)));
