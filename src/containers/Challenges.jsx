import React from "react";
import withAuthentication from "./../components/auth/WithAuthentication"
import { observer, inject } from "mobx-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Challenges = ({databaseStore}) => {
  const [matches, setMatches] = useState("")

  useEffect(() => {
    const getMatches = async () => {
      let matches = await databaseStore.getMatches(localStorage.uid);

      setMatches(matches);
    }
  
    getMatches();
  }, [databaseStore])


  return (
    <>
      <h1>Challenges</h1>
      <section>
        <h2>Matches</h2>
        <ul>
        {
          Object.entries(matches).map(([key, val]) => {
            if (key !== "doNotDelete") {
              return (
                <li key={key}>
                    <p>{val.username}</p>
                    <Link to={"/room/" + val.roomId}>
                      <button>
                        More questions
                      </button>
                    </Link>
                </li>
                )
            }
              })
            }
        </ul>
      </section>
    </>
  );
};

export default inject(`databaseStore`)(withAuthentication(observer(Challenges)));
