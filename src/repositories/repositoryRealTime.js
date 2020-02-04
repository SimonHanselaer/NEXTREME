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
                    grens: user.grens,
                    antwoorden: user.antwoorden,
                    uid: user.uid
                });
            } else {
                dbRealTime.ref('/lookingForMatch/').once('value').then(snapshot => {

                    let array = [];

                    for (const property in snapshot.val()) {
                        if (property === user.uid || property === "doNotDelete" || snapshot.val()[property].grens !== user.grens) {
                            console.log("do not use!");
                        } else {
                            array.push(snapshot.val()[property]);
                        }
                    }

                    if (array.length !== 0) {
                        let matchedUser = array[0];
                        dbRealTime.ref('/rooms/').once('value').then(roomSnapshot => {
                            let roomCount = Object.keys(roomSnapshot.val()).length;
                            roomCount++;

                            dbRealTime.ref('/rooms/room' + roomCount).set({
                                antwoorden: {
                                    user1: matchedUser.antwoorden,
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
                                prevGrens: user.grens,
                                users: {
                                    user1: matchedUser.uid,
                                    user2: user.uid
                                }

                            })

                            dbRealTime.ref('rooms/room' + roomCount + '/grenzen/').update({
                                [user.grens]: 2
                            })
                        })

                        let lookingForMatchId = matchedUser.uid;
                        dbRealTime.ref('lookingForMatch/' + lookingForMatchId).remove();
                    }
                    
                    
                    if (array.length === 0) {
                        dbRealTime.ref('/lookingForMatch/' + user.uid).set({
                            language: user.Language,
                            regio: user.Regio,
                            grens: user.grens,
                            antwoorden: user.antwoorden,
                            uid: user.uid
                        });
                    }
                });
            }
        });

        
    }
}