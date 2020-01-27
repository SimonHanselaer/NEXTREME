import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class GrensCard extends Component {
    render() {
        const {name} = this.props;
        return <article>
            <h2>{name}grens</h2>
            <NavLink to={"/" + name + "grens"}>
                <button>{name} grens</button>
            </NavLink>
            </article>
    }
}

export default GrensCard;