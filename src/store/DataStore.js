import { decorate, observable, configure, action } from "mobx";

configure({ enforceActions: `observed` });

class DataStore { 
    grenzen = ["Cultuur","Regio","Kunst","Taal"];
    challenge1CultuurCount = 3;
    challenge1KunstCount = 3;
    challenge1RegioCount = 3;
    challenge1TaalCount = 3;

    roomId = 0;

    handleAnswerQuestions = prop => {
        this.roomId = prop;
    }


}

decorate(DataStore, {
    grenzen: observable,
    challenge1CultuurCount: observable,
    challenge1KunstCount: observable,
    challenge1RegioCount: observable,
    challenge1TaalCount: observable,
    roomId: observable,
    handleAnswerQuestions: action
  });

  export default DataStore;