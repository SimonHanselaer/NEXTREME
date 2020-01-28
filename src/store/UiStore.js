import { decorate, observable, action } from "mobx";
import firebase from "firebase";

class UiStore {
  authUser = null;

  setUser = value => (this.authUser = value);

  logout = () => {
    firebase.auth().signOut().then(() => {
      this.setUser(null);
      localStorage.clear();
      localStorage.removeItem("uid")
      });
  };
}

decorate(UiStore, { authUser: observable, setUser: action });

export default UiStore;
