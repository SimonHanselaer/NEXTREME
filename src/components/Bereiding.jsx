import React from "react";
import styles from "./Bereiding.module.css";

const Bereiding = props => {
    const stappen = props.stappen;
    
    return (
        <ul>
            {
                Object.entries(stappen).map(([key, val]) => {
                    return <li key={key} className={styles.cardStap}>
                        <h3 className="header-1">Stap {key}:</h3>
                        <p>{val}</p>
                    </li>
            }
            )
            }
        </ul>
    )
}

export default Bereiding;