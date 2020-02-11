import React from "react";
import withAuthentication from "./../components/auth/WithAuthentication"
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";

const MyMatches = props => {
    let matches = props.matches;

    return (
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
                return null
                    })
                }
            </ul>
      </section>
  );
};

export default inject(`databaseStore`)(withAuthentication(observer(MyMatches)));
