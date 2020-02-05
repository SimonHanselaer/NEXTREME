import React from "react";
import withAuthentication from "./../components/auth/WithAuthentication"
import { useParams, Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { useState } from "react";

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
    }, [databaseStore, id, url, room]);

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

  return (
    <>
        <h1>Room {id}</h1>
        {room.chat === true ? (
            <>
                <button onClick={() => handleChat()}>chat</button>
                <Link to={"../" + url}>
                    <button onClick={() => {handleAnswerQuestions()}}>Answer more questions</button>
                </Link>
            </>
        ) : (
            <>
                {room.chat === localStorage.uid ? (
                    <>
                        <p>chat requested</p>
                        <Link to={"../" + url}>
                            <button onClick={() => {handleAnswerQuestions()}}>Answer more questions</button>
                        </Link>
                    
                        {room && user !== "" ? (
                            <section>
                                <h2>{room.prevGrens}</h2>
                                <p>Your match answered:</p>
                                <article>
                                    <p>{room.antwoorden[user].vraag1.vraag}</p>
                                    <p>{room.antwoorden[user].vraag1.antwoord}</p>
                                </article>
                                <article>
                                    <p>{room.antwoorden[user].vraag2.vraag}</p>
                                    <p>{room.antwoorden[user].vraag2.antwoord}</p>
                                </article>
                                <article>
                                    <p>{room.antwoorden[user].vraag3.vraag}</p>
                                    <p>{room.antwoorden[user].vraag3.antwoord}</p>
                                </article>
                            </section>
                        ) : (
                            <p>Aan het laden...</p>
                        )}
                    </>
                ) : (
                    <>
                    <button onClick={() => handleChatRequest()}>Request to chat</button>
                    <Link to={"../" + url}>
                            <button onClick={() => {handleAnswerQuestions()}}>Answer more questions</button>
                        </Link>
                    
                        {room && user !== "" ? (
                            <section>
                                <h2>{room.prevGrens}</h2>
                                <p>Your match answered:</p>
                                <article>
                                    <p>{room.antwoorden[user].vraag1.vraag}</p>
                                    <p>{room.antwoorden[user].vraag1.antwoord}</p>
                                </article>
                                <article>
                                    <p>{room.antwoorden[user].vraag2.vraag}</p>
                                    <p>{room.antwoorden[user].vraag2.antwoord}</p>
                                </article>
                                <article>
                                    <p>{room.antwoorden[user].vraag3.vraag}</p>
                                    <p>{room.antwoorden[user].vraag3.antwoord}</p>
                                </article>
                            </section>
                        ) : (
                            <p>Aan het laden...</p>
                        )}
                    </>
                )}
                
                
                
            </>
        )}
    </>
  );
};

export default inject(`databaseStore`, `dataStore`)(withAuthentication(observer(Room)));
