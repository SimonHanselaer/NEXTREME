import { decorate, configure, action } from "mobx";

import { RepositoryFactory } from "./../repositories/repositoryFactory";
const FirestoreRepository = RepositoryFactory.get("firestore");
const RealTimeRepository = RepositoryFactory.get("realTime");

configure({ enforceActions: `observed` });

class DatabaseStore {
    addNewUser = props => {
        FirestoreRepository.addNewUser(props);
        RealTimeRepository.addNewUser(props);
    }

    updateUser = props => {
        FirestoreRepository.updateUser(props);
        // RealTimeRepository.updateUser(props);
    }

    selectLanguage = prop => {
        FirestoreRepository.selectLanguage(prop);
    }

    selectRegio = prop => {
        FirestoreRepository.selectRegio(prop);
    }

    getChallenge = props => {
        const challenge = FirestoreRepository.getChallenge(props);
        return challenge;
    }

    getMatches = prop => {
        const matches = RealTimeRepository.getMatches(prop);
        return matches;
    }

    getRoom = prop => {
        const room = RealTimeRepository.getRoom(prop);
        return room;
    }

    updateAnswers = props => {
        RealTimeRepository.updateAnswers(props);
    }

    lookingForMatch = async (props, grens) => {
        const user = await FirestoreRepository.getUserInfo(localStorage.uid);
        user.uid = localStorage.uid;
        user.antwoorden = props;
        user.grens = grens;
        user.username = localStorage.username;
        RealTimeRepository.lookingForMatch(user);
    }

    getMessages = prop => {
        const messages = RealTimeRepository.getMessages(prop);
        return messages;
    }

    newMessage = props => {
        RealTimeRepository.newMessage(props);
    }

    setChatRequest = props => {
        RealTimeRepository.setChatRequest(props);
    }

    updateCompletedChallenges = props => {
        RealTimeRepository.updateCompletedChallenges(props);
    }

    getChallengesUser = async prop => {
        const challenges = await RealTimeRepository.getChallengesUser(prop);
        return challenges;   
    }

    getRegio = async (prop) => {
        const userInfo = await FirestoreRepository.getUserInfo(prop);
        return userInfo;
    }

    removeRoom = props => {
        RealTimeRepository.removeRoom(props);
    }

    getResults = (prop) => {
        const results = RealTimeRepository.getResults(prop);
        return results;
    }

    newResultA = props => {
        RealTimeRepository.newResultA(props);
    }
    newResultB = props => {
        RealTimeRepository.newResultB(props);
    }

    getResultProcentA = (prop) => {
        const resultsProcentA = RealTimeRepository.getResultsProcentA(prop);
        return resultsProcentA;
    }

    getResultProcentB = (prop) => {
        const resultsProcentB = RealTimeRepository.getResultsProcentB(prop);
        return resultsProcentB;
    }

    getInfo = async props => {
        const info = await FirestoreRepository.getInfo(props);
        return info;
    }

    getUsers = async prop => {
        const userInfo = await RealTimeRepository.getUserThemInfo(prop);
        return userInfo;
    }
}

decorate(DatabaseStore, {
    addNewUser: action,
    selectLanguage: action,
    selectRegio: action
});

export default DatabaseStore;