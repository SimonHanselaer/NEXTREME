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

                dbRealTime.ref('/rooms/room' + props.roomId + '/vraag/user1').set({
                    grens: props.grens,
                    nummer: props.nummer
                })
            } else {
                dbRealTime.ref('/rooms/room' + props.roomId + '/antwoorden/user2').set({
                    vraag1: props.vraag1,
                    vraag2: props.vraag2,
                    vraag3: props.vraag3
                });

                dbRealTime.ref('/rooms/room' + props.roomId + '/vraag/user2').set({
                    grens: props.grens,
                    nummer: props.nummer
                })
            }

            if (snapshot.val().vraag.user1.grens === snapshot.val().vraag.user2.grens && snapshot.val().vraag.user1.nummer === snapshot.val().vraag.user2.nummer) {
                dbRealTime.ref('/rooms/room' + props.roomId + '/grenzen/').update({
                    [snapshot.val().vraag.user1.grens]: parseInt(snapshot.val().vraag.user1.nummer) + 1
                });

                let grenzen = ["Cultuur", "Kunst", "Taal", "Regio"];


                dbRealTime.ref('/rooms/room' + props.roomId).update({
                    nextGrens: grenzen[Math.floor(Math.random() * grenzen.length)]
                })
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
                    uid: user.uid,
                    username: user.username
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
                            });

                            dbRealTime.ref('/users/' + user.uid + '/contacts/').update({
                                [matchedUser.uid]: {
                                    roomId: roomCount,
                                    username: matchedUser.username
                                }
                            });

                            dbRealTime.ref('/users/' + matchedUser.uid + '/contacts/').update({
                                [user.uid]: {
                                    roomId: roomCount,
                                    username: user.username
                                }
                            });


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
                            uid: user.uid,
                            username: user.username
                        });
                    }
                });
            }
        });

        
    },

    async addNewUser(props) {
        dbRealTime.ref('/users/' + props.uid).set({
            contacts: {
                doNotDelete: true
            }
        })
    },

    async getMessages(prop) {
        let messages = await dbRealTime.ref('/chats/chat' + prop).orderByChild('timestamp').once('value').then(snapshot => {
            return snapshot.val()
        })

        return messages;
    },

    async newMessage(props) {
        dbRealTime.ref('/chats/chat' + props.roomId + '/').push({
            message: props.message,
            timestamp: props.timestamp,
            uid: props.uid
        })
    },

    async setChatRequest(props) {
        dbRealTime.ref('/rooms/room' + props.roomId).once('value').then(snapshot => {
            if (snapshot.val().chat === false || snapshot.val().chat === props.uid) {
                dbRealTime.ref('/rooms/room' + props.roomId).update({
                    chat: props.uid
                });
            } else {
                dbRealTime.ref('/rooms/room' + props.roomId).update({
                    chat: true
                });
            }
        })
    },

    async updateCompletedChallenges(props) {
        if (props.challenge === 'challenge4') {
            dbRealTime.ref('/users/' + props.uid + '/challenges/' + props.challenge).update({
                    [props.grens]: props.id
            })   
        }

        if (props.challenge === 'challenge1') {
            dbRealTime.ref('/users/' + props.uid + '/challenges/' + props.challenge + '/' + props.grens + props.id).update({
                status: props.status,
                naam: props.naam,
                grens: props.grens,
                id: props.id
            })
        }
    },

    async getChallengesUser(prop) {
        let challenges = await dbRealTime.ref('/users/' + prop + '/challenges/challenge1').once('value').then(snapshot => {
            return snapshot.val()
        });

        return challenges
    },

    async removeRoom(props) {
        dbRealTime.ref('/users/' + props.user1 + '/contacts/' + props.user2).remove();
        dbRealTime.ref('/users/' + props.user2 + '/contacts/' + props.user1).remove();
        dbRealTime.ref('/rooms/room' + props.roomId).remove();
    }
}