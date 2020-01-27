import DataStore from "./DataStore";

class RootStore {
  constructor() {
    this.dataStore = new DataStore(this);
  }
}

export default new RootStore();
