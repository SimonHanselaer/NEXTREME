import React from "react";
import withAuthentication from "./../components/auth/WithAuthentication"
import { observer, inject } from "mobx-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";


const Chat = ({databaseStore}) => {
    let {id} = useParams();

    const [messages, setMessages] = useState("");

    const [newMessage, setNewMessage] = useState("");


    useEffect(() => {
        const getMessages = async () => {
            let messages = await databaseStore.getMessages(id);
            setMessages(messages);
        }

        getMessages();
    }, [databaseStore, id, messages]);

    const handleSendMessage = e => {
        e.preventDefault();


        const props = {
            message: newMessage,
            uid: localStorage.uid,
            timestamp: Date.now(),
            roomId: id
        }

        databaseStore.newMessage(props);
        e.currentTarget.reset();
        setNewMessage("");
        console.log(newMessage);
        console.log('Form submit');
    }



  return (
    <>
      <h1>Chat</h1>
      {
          messages ? (
              Object.keys(messages).map(key => {
                  return (
                      <p key={key}>{messages[key].uid + ": " + messages[key].message}</p>
                  )
              })
          ) : (
              <p>Loading...</p>
          )
      }
      <form onSubmit={e => handleSendMessage(e)}>
          <input type="text" placeholder="Your message" onChange={e => setNewMessage(e.currentTarget.value)}/>
          <button type="submit">Send</button>
      </form>
    </>
  );
};

export default inject(`databaseStore`)(withAuthentication(observer(Chat)));
