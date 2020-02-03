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

    useEffect(() => {
        const getRoom = async () => {
            let room = await databaseStore.getRoom(id);
            setRoom(room);

            switch (room.nextGrens) {
                case 'Cultuur':
                    setUrl("/challenge2/" + room.nextGrens + "/" + room.grenzen.Cultuur); 
                    break;

                case 'Kunst':
                    setUrl("/challenge2/" + room.nextGrens + "/" + room.grenzen.Kunst);
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
                <button>Answer more questions</button>
            </>
        ) : (
            <Link to={"../" + url}>
                <button onClick={() => {handleAnswerQuestions()}}>Answer more questions</button>
            </Link>
        )}
    </>
  );
};

export default inject(`databaseStore`, `dataStore`)(withAuthentication(observer(Room)));
