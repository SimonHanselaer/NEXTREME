import React from "react";

import Ingredient from "./Ingredient";

import styles from "./Recept.module.css";

const Ingredienten = props => {
    const ingredienten = props.ingredienten;
    
    return (
        <ul>
            {
                Object.entries(ingredienten).map(([key, val]) => {
                    return (
                    <li key={key} className={styles.listItem}>
                        <Ingredient ingredient={key} hoeveelheid={val} />
                    </li>
                    )
            }
            )
            }
        </ul>
    )
}

export default Ingredienten;