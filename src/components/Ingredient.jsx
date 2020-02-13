import React from "react";

import styles from "./Recept.module.css";
import { useState } from "react";

const Ingredient = (props) => {
    const {ingredient} = props;
    const {hoeveelheid} = props;

    const [status, setStatus] = useState(false)

    return (
        <>
            <p className={`small ${styles.ingredient}`}>{ingredient}</p>
            <p className={`detail ${styles.hoeveelheid}`}>{hoeveelheid}</p>

            {status ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.checkmark} onClick={() => setStatus(false)}>
                    <circle cx="12" cy="12" r="12" fill="url(#paint0_linear)"/>
                    <path d="M7 12.9091L10.913 17L17 7" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                    <linearGradient id="paint0_linear" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFC371"/>
                    <stop offset="1" stopColor="#FF5F6D"/>
                    </linearGradient>
                    </defs>
                </svg>                        
            ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.checkmark} onClick={() => setStatus(true)}>
                    <circle cx="12" cy="12" r="11.5" stroke="url(#paint0_linear)"/>
                    <defs>
                    <linearGradient id="paint0_linear" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFC371"/>
                    <stop offset="1" stopColor="#FF5F6D"/>
                    </linearGradient>
                    </defs>
                </svg>
            )}
        </>
    )
}

export default Ingredient;