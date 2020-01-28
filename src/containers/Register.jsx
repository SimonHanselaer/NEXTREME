import React, { useState } from "react";
import * as firebase from 'firebase';
import { useHistory } from "react-router-dom";
import { inject, observer } from "mobx-react";

const Home = ({ databaseStore, uiStore }) => {
    let history = useHistory();

    const [valueEmail, setValueEmail] = useState("");
    const [valuePassword, setvaluePassword] = useState("");
    const [valueConfirmPassword, setValueConfirmPassword] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (valuePassword !== valueConfirmPassword) {
            alert("passwords don't match")   
        } else {
            firebase.auth().createUserWithEmailAndPassword(valueEmail, valuePassword).then(
                user => {
                    localStorage.setItem("uid", user.user.uid);
                    databaseStore.addNewUser(user.user.uid);
                    uiStore.setUser(user.user.uid);

                    history.push("/selectlanguage");
                },
                err => {alert("Oops!" + err.message)}
            );
        }
    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="E-mail" onChange={e => setValueEmail(e.currentTarget.value)}/>
                <input type="password" placeholder="Password" onChange={e => setvaluePassword(e.currentTarget.value)}/>
                <input type="password" placeholder="Confirm password" onChange={e => setValueConfirmPassword(e.currentTarget.value)} />
                <button type="submit">Register</button>
            </form>
        </>
    )
}

export default inject(`databaseStore`, `uiStore`)(observer(Home));
