import { decorate, configure, action } from "mobx";

import { RepositoryFactory } from "./../repositories/repositoryFactory";
const FirestoreRepository = RepositoryFactory.get("firestore");

configure({ enforceActions: `observed` });

class DatabaseStore {
    addNewUser = props => {
        FirestoreRepository.addNewUser(props);
    }

    selectLanguage = prop => {
        FirestoreRepository.selectLanguage(prop);
    }

    selectRegio = prop => {
        FirestoreRepository.selectRegio(prop);
    }
}

decorate(DatabaseStore, {
    addNewUser: action,
    selectLanguage: action,
    selectRegio: action
});

export default DatabaseStore;