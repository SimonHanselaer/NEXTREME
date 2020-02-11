import React from "react";
import withAuthentication from "./../components/auth/WithAuthentication"
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";

const MyMatches = props => {
    let matches = props.matches;

    return (
        <section>
            <ul>
            {
                Object.entries(matches).map(([key, val]) => {
                if (key !== "doNotDelete") {
                    return (
                    <li key={key}>
                        <Link to={"/room/" + val.roomId}>
                            <p className="header-1">{val.username}</p>
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