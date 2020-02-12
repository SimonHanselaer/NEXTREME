import React from "react";
import styles from "./Bereiding.module.css";
import stylesTypo from "../styles/typo.module.css";

const Bereiding = props => {
    const stappen = props.stappen;
    
    return (
        <ul className={styles.unorderedList}>
            {
                Object.entries(stappen).map(([key, val]) => {
                    return <li key={key} className={styles.cardStap}>
                        <h3 className={stylesTypo.header1}>Stap {key}:</h3>
                        <p>{val}</p>
                    </li>
            }
            )
            }
        </ul>
    )
}

export default Bereiding;