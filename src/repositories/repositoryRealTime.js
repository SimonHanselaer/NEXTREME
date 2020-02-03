import { dbRealTime } from "../index";
// import firebase from "firebase";

export default {

    async getMatches(prop) {
        const matches = await dbRealTime.ref('/users/' + prop + '/contacts/').once('value').then(snapshot => {
            return snapshot.val();
        })

        return matches
    },

    async getRoom(prop) {
        const room = await dbRealTime.ref('/rooms/room' + prop).once('value').then(snapshot => {
            return snapshot.val()
        })

        return room
    },

    async updateAnswers(props) {
        dbRealTime.ref('/rooms/room' + props.roomId).once('value').then(snapshot => {
            if (snapshot.val().users.user1 === props.userUid) {
                dbRealTime.ref('/rooms/room' + props.roomId + '/antwoorden/user1').set({
                    vraag1: props.vraag1,
                    vraag2: props.vraag2,
                    vraag3: props.vraag3
                });
            } else {
                dbRealTime.ref('/rooms/room' + props.roomId + '/antwoorden/user2').set({
                    vraag1: props.vraag1,
                    vraag2: props.vraag2,
                    vraag3: props.vraag3
                });
            }
        })
    },

    async lookingForMatch(user) {
        dbRealTime.ref('/lookingForMatch/').once('value').then(snapshot => {
            if (Object.entries(snapshot.val()).length === 1 && snapshot.val().constructor === Object) {
                dbRealTime.ref('/lookingForMatch/' + user.uid).set({
                    language: user.Language,
                    regio: user.Regio,
                    antwoorden: user.antwoorden,
                    uid: user.uid
                });
            } else {
                const match = dbRealTime.ref('/lookingForMatch/').limitToFirst(1).once('value').then(snapshot => {
                    dbRealTime.ref('/rooms/').once('value').then(roomSnapshot => {
                        let roomCount = Object.keys(roomSnapshot.val()).length;
                        roomCount++;
                        let matchedUserData = Object.values(snapshot.val())[0];

                        dbRealTime.ref('/rooms/room' + roomCount).set({
                            antwoorden: {
                                user1: matchedUserData.antwoorden,
                                user2: user.antwoorden
                            },
                            chat: false,
                            grenzen: {
                                Cultuur: 1,
                                Taal: 1,
                                Regio: 1,
                                Kunst: 1
                            },
                            nextGrens: "Cultuur",
                            prevGrens: "??",
                            users: {
                                user1: matchedUserData.uid,
                                user2: user.uid
                            }

                        })
                    })
                });
            }
        });

        
    }
}