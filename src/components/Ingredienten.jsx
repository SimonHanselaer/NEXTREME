import React from "react";

const Ingredienten = props => {
    const ingredienten = props.ingredienten;
    
    return (
        <ul>
            {
                Object.entries(ingredienten).map(([key, val]) => {
                    return <li key={key}>
                        <p className="small">{key}</p>
                        <p className="detail">{val}</p>
                    </li>
            }
            )
            }
        </ul>
    )
}

export default Ingredienten;