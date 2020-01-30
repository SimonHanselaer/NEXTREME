import { decorate, observable, configure } from "mobx";

configure({ enforceActions: `observed` });

class DataStore { 
    grenzen = ["Cultuur","Regio","Kunst","Taal"];
    challenge1CultuurCount = 3;
    challenge1KunstCount = 3;
    challenge1RegioCount = 3;
    challenge1TaalCount = 3;

}

decorate(DataStore, {
    grenzen: observable,
    challenge1CultuurCount: observable,
    challenge1KunstCount: observable,
    challenge1RegioCount: observable,
    challenge1TaalCount: observable
  });

  export default DataStore;