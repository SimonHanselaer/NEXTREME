import React, {useState} from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { observer, inject } from "mobx-react";
import { useParams } from "react-router-dom";

import Challenge4Kortrijk from "../components/Challenge4Kortrijk";
import Challenge4Doornik from "../components/Challenge4Doornik";
import Challenge4Lille from "../components/Challenge4Lille";
import TopBar from "../components/TopBar";

import stylesUi from "../styles/ui.module.css";

const Challenge4 = ({ databaseStore }) => {
  let { grens } = useParams();
  let { id } = useParams();

  const [status, setStatus] = useState(false);

  if (!status) {
    return (
      <>
        <TopBar title="empty" />
        <div className={stylesUi.contentContainer}>
          <p>Versleep de juiste typische monumenten, dranken, eten ... naar de stad. Als het niet klopt, versleep naar de vuilbak.</p>
          <button className="buttonOne" onClick={() => setStatus(true)}>Start</button>
        </div>
      </>
    ) 
  } else {
      switch (id) {
        case '1':
          return (
            <>
            <TopBar title="Kortrijk" />
            <div className={stylesUi.contentContainer}>
              <Challenge4Kortrijk grens={grens} databaseStore={databaseStore} />
            </div>
            </>
          );

        case '2':
          return (
            <>
            <TopBar title="Doornik" />
            <div className={stylesUi.contentContainer}>
              <Challenge4Doornik grens={grens} databaseStore={databaseStore} />
            </div>
            </>
          );

        case '3':
          return (
            <>
            <TopBar title="Lille" />
            <div className={stylesUi.contentContainer}>
              <Challenge4Lille grens={grens} databaseStore={databaseStore} />
            </div>
            </>
          );

         default:
          return (
             <h1>Whoops! Something went wrong!</h1>
          );
       }
  }
 
}

export default inject(`databaseStore`)(withAuthentication(observer(Challenge4)));
