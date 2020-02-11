import React from "react";
import { useHistory } from "react-router-dom";

const Back = () => {
    let history = useHistory();

    return (
        <button onClick={() => history.goBack()}>Back</button>
    )
}

export default Back;