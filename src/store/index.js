import DataStore from "./DataStore";
import DatabaseStore from "./DatabaseStore";
import UiStore from "./UiStore";

class RootStore {
  constructor() {
    this.dataStore = new DataStore(this);
    this.databaseStore = new DatabaseStore(this);
    this.uiStore = new UiStore(this);
  }
}

export default new RootStore();
