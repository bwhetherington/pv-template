import React from "react";
import "../styles/Button.scss";

const Button = (props) => (
    <button className="button" onClick={props.onClick}>
        {props.children}
    </button>
);

export default Button;