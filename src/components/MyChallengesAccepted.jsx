import React from "react";
import { Link } from "react-router-dom";

const MyChallengesAccepted = props => {
    const challenges = props.challenges;
    
    return (
        <ul>
              {
                Object.entries(challenges).map(([key, val]) => {
                  if (val.status === "geaccepteerd") {
                    return (
                      <li key={key}>
                        <Link to={"/challenge1/" + val.grens + "/" + val.id}>
                        <h4>{val.naam}</h4>
                        </Link>
                      </li>
                    ) 
                  }
                  return null
                })
              }
        </ul>
    )
}

export default MyChallengesAccepted;