import React, { useState } from "react";
import * as firebase from 'firebase';
import { NavLink, useHistory } from "react-router-dom";
import { inject, observer } from "mobx-react";

import styles from "./Authentication.module.css";
import stylesUi from "../styles/ui.module.css";
import stylesTypo from "../styles/typo.module.css";
import TopBar from "../components/TopBar";

import img from "../assets/img/onboarding/acc2.png"

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
                    localStorage.setItem("username", user.user.displayName)
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
            <TopBar title="nextend" />
            <div className={stylesUi.contentContainer}>
            <img src={img} alt="" width="150" className={styles.img2}/>
            <h1 className={styles.title}>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input className={`${stylesUi.formInput} ${stylesTypo.input}`} type="text" placeholder="E-mail" onChange={e => setValueEmail(e.currentTarget.value)}/>
                    <input className={`${stylesUi.formInput} ${stylesTypo.input}`} type="password" placeholder="Password" onChange={e => setvaluePassword(e.currentTarget.value)}/>
                    <input className={`${stylesUi.formInput} ${stylesTypo.input}`} type="password" placeholder="Confirm password" onChange={e => setValueConfirmPassword(e.currentTarget.value)} />
                    <NavLink to="/login">
                        <p className={`${stylesTypo.small} ${styles.register}`}>Already have an account? Log in</p>
                    </NavLink>
                    <button type="submit" className={stylesUi.registerButton}>Register</button>
                </form>

            </div>
           
        </>
    )
}

export default inject(`databaseStore`, `uiStore`)(observer(Home));
