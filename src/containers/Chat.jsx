import React from "react";
import withAuthentication from "./../components/auth/WithAuthentication"
import { observer, inject } from "mobx-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState, useRef } from "react";
import Back from "../components/Back";

import styles from "./Chat.module.css";
import stylesUi from "../styles/ui.module.css";

import qa from "../assets/img/icons/q&a.svg";
import send from "../assets/img/icons/send.svg";

const Chat = ({databaseStore}) => {
    let {id} = useParams();

    const [messages, setMessages] = useState("");
    const [usernameThem, setUsernameThem] = useState("");

    const [newMessage, setNewMessage] = useState("");

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        const getMessages = async () => {
            let messages = await databaseStore.getMessages(id);
            setMessages(messages);
        }
        console.log('test');
        getMessages();
        
    }, [databaseStore, id, messages]);

    const handleSendMessage = e => {
        e.preventDefault();
        // window.scrollTo(0, 0);

        const props = {
            message: newMessage,
            uid: localStorage.uid,
            username: localStorage.username,
            timestamp: Date.now(),
            roomId: id
        }

        databaseStore.newMessage(props);
        e.currentTarget.reset();
        setNewMessage("");
        console.log(newMessage);
        console.log('Form submit');
        scrollToBottom();
        console.log('scrolled');
    }



  return (
    <>
        {/* <p>{usernameThem}</p> */}
        <div className={styles.bodyBg}>
            <section className={styles.header}>
                <Back />
            </section> 
            <section className={styles.contentContainer}>
                <div className={stylesUi.flexRow}>
                    <img className={styles.messagesImg} src={send} alt="profile picture of person who you are chatting with"/>
                    <h1 className={styles.messagesTitle}>Chat</h1>
                </div>
                <p className={styles.line}></p>
                <article className={styles.messageContainer} ref={messagesEndRef}>
                    {
                        messages ? (
                            Object.keys(messages).map(key => {
                            if(messages[key].uid === localStorage.uid){
                                return (
                                    <>
                                    <div className={styles.mijnBericht}>
                                        <p key={key}> <span>{messages[key].message}</span></p>
                                    </div>  
                                    </>
                                )         
                            }else{
                                // setUsernameThem(messages[key].username);
                                return (
                                    <>
                                    <div className={styles.zijnBericht}>
                                        <p key={key}> <span>{messages[key].message}</span></p>
                                    </div>  
                                    </>
                                )
                            }
                            //   return (
                            //       <>
                            //         <p key={key}>{messages[key].uid + ": " + messages[key].message}</p>
                            //       </>
                            //   )
                            })
                        ) : (
                            <p>Loading...</p>
                        )
                    }
                </article>
                <article className={styles.typeField}>
                    <img src={qa} alt="Q en A icon"/>
                    <form onSubmit={e => handleSendMessage(e)}>
                        <div className={styles.textInput}>
                            <input type="text" placeholder="Type your message..." onChange={e => setNewMessage(e.currentTarget.value)}/>
                            <button className={styles.send} type="submit"><img src={send} alt="send button icon"/></button>
                        </div>
                    </form>
                </article>
            </section>
        </div>
    </>
  );
};

export default inject(`databaseStore`)(withAuthentication(observer(Chat)));
