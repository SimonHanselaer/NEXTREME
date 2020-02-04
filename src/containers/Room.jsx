import React from "react";
import withAuthentication from "./../components/auth/WithAuthentication"
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { useState } from "react";

const Room = ({databaseStore, dataStore}) => {
    let {id} = useParams();
    const [room, setRoom] = useState("");

    const [url, setUrl] = useState("");

    const [vragen, setVragen] = useState("");

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

            console.log(room);

            // const props = {
            //     challenge: 2,
            //     grens: room.prevGrens,
            //     id: room.grenzen[room.prevGrens].toString()
            //   }
            
            // let awaitingChallenge = await databaseStore.getChallenge(props);
            // setVragen(awaitingChallenge);
        }

        getRoom();
    }, [databaseStore, id, url]);

    const handleAnswerQuestions = () => {
        dataStore.handleAnswerQuestions(id);
    }

  return (
    <>
        <h1>Room {id}</h1>
        {room.chat ? (
            <>
                <button>chat</button>
                <button onClick={() => {handleAnswerQuestions()}}>Answer more questions</button>
            </>
        ) : (
            <>
                <Link to={"../" + url}>
                    <button onClick={() => {handleAnswerQuestions()}}>Answer more questions</button>
                </Link>
                {room ? (
                    <section>
                    <article>
                        <p>{room.antwoorden.user1.vraag1.vraag}</p>
                        <p>{room.antwoorden.user1.vraag1.antwoord}</p>
                    </article>
                    <article>
                        <p>{room.antwoorden.user1.vraag2.vraag}</p>
                        <p>{room.antwoorden.user1.vraag2.antwoord}</p>
                    </article>
                    <article>
                        <p>{room.antwoorden.user1.vraag3.vraag}</p>
                        <p>{room.antwoorden.user1.vraag3.antwoord}</p>
                    </article>
                </section>
                ) : (
                    <p>Aan het laden...</p>
                )}
                
            </>
        )}
    </>
  );
};

export default inject(`databaseStore`, `dataStore`)(withAuthentication(observer(Room)));
