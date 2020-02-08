import React, {useState} from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { observer, inject } from "mobx-react";
import { useParams } from "react-router-dom";

import Challenge4Kortrijk from "../components/Challenge4Kortrijk";
import Challenge4Doornik from "../components/Challenge4Doornik";
import Challenge4Lille from "../components/Challenge4Lille";


const Challenge4 = ({ databaseStore }) => {
  let { grens } = useParams();
  let { id } = useParams();

  const [status, setStatus] = useState(false);

  if (!status) {
    return (
      <>
        <p>Versleep de juiste typische monumenten, dranken, eten ... naar de stad. Als het niet klopt, versleep naar de vuilbak.</p>
        <button onClick={() => setStatus(true)}>Start</button>
      </>
    ) 
  } else {
      switch (id) {
        case '1':
          return (
            <Challenge4Kortrijk grens={grens} databaseStore={databaseStore} />
          );

        case '2':
          return (
            <Challenge4Doornik grens={grens} databaseStore={databaseStore} />
          );

        case '3':
          return (
            <Challenge4Lille grens={grens} databaseStore={databaseStore} />
          );

         default:
          return (
             <h1>Whoops! Something went wrong!</h1>
          );
       }
  }
 
}

export default inject(`databaseStore`)(withAuthentication(observer(Challenge4)));
