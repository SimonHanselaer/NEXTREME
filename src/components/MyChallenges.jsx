import React, { useState } from "react";
import withAuthentication from "./../components/auth/WithAuthentication"
import { observer, inject } from "mobx-react";
import MyChallengesAccepted from "./MyChallengesAccepted";
import MyChallengesCompleted from "./MyChallengesCompleted";

const MyChallenges = props => {
    let challenges = props.challenges;
    const [status, setStatus] = useState(true);

    return (
        <section>
          <article>
            <button className={status ? "noButton header-1" : "noButton"} onClick={() => setStatus(true)}>Te doen</button>
            <button className={status ? "noButton" : "noButton header-1"} onClick={() => setStatus(false)}>Gedaan</button>
          </article>
          {status ? (
           <MyChallengesAccepted challenges={challenges} />
          ) : (
           <MyChallengesCompleted challenges={challenges} />
          )}
        </section>
  );
};

export default inject(`databaseStore`)(withAuthentication(observer(MyChallenges)));
