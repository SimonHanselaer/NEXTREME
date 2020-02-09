import { db } from "../index";
// import firebase from "firebase";

export default {
    async addNewUser(props) {
        let addNewUser = await db.collection("users").doc(props.uid);

        addNewUser.get().then(docSnapshot => {
            if (!docSnapshot.exists) {
                addNewUser.set({Username: props.username});   
            }});
    },

    async selectLanguage(prop) {
        db.collection("users").doc(localStorage.uid).update({Language: prop});
    },

    async selectRegio(prop) {
        db.collection("users").doc(localStorage.uid).update({Regio: prop});
    },

    async getChallenge(props) {
        const challenge = await db.collection("Challenges").doc("Challenge" + props.challenge).collection(props.grens + "grens").doc(props.id).get().then(doc => {
            return doc.data()
        });

        return challenge
    },

    async getUserInfo(prop) {
        const user = await db.collection("users").doc(prop).get().then(doc => {
            return doc.data()
        });

        return user
    },

    async getChallengeName(challengeGrens, challengeNumber) {
        const challengeNaam = await db.collection("Challenges").doc("Challenge1").collection(challengeGrens + "grens").doc(challengeNumber.charAt(challengeNumber.length - 1)).get().then(doc => {
            return doc.data().naam
        })

        return challengeNaam
    },

    async getInfo(props) {
        const info = await db.collection("info").doc(props.id).get().then(doc => {
            return doc.data()[props.grens]
        });

        return info
    }


}