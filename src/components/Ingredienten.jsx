import React from "react";

import styles from "./Recept.module.css";

const Ingredienten = props => {
    const ingredienten = props.ingredienten;
    
    return (
        <ul>
            {
                Object.entries(ingredienten).map(([key, val]) => {
                    return <li key={key} className={styles.listItem}>
                        <p className={`small ${styles.ingredient}`}>{key}</p>
                        <p className={`detail ${styles.hoeveelheid}`}>{val}</p>

                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.checkmark}>
                        <circle cx="12" cy="12" r="11.5" stroke="url(#paint0_linear)"/>
                        <defs>
                        <linearGradient id="paint0_linear" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FFC371"/>
                        <stop offset="1" stop-color="#FF5F6D"/>
                        </linearGradient>
                        </defs>
                        </svg>
                    </li>
            }
            )
            }
        </ul>
    )
}

export default Ingredienten;