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
    }
}