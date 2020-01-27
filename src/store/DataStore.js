import { decorate, observable, configure } from "mobx";

configure({ enforceActions: `observed` });

class DataStore { 
    grenzen = ["cultuur","regio","kunst","taal"];
}

decorate(DataStore, {
    grenzen: observable
  });

  export default DataStore;