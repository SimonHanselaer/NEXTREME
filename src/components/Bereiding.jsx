import React from "react";

const Bereiding = props => {
    const stappen = props.stappen;
    
    return (
        <ul>
            {
                Object.entries(stappen).map(([key, val]) => {
                    return <li key={key}>
                        <p>Stap {key}: {val}</p>
                    </li>
            }
            )
            }
        </ul>
    )
}

export default Bereiding;