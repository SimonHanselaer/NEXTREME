import { Provider } from "mobx-react";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
import "./styles/index.css";

import * as firebase from "firebase";
import firebaseConfig from "./firebase.config";
import "firebase/firestore";

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider {...store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export const db = firebase.firestore();
