import React from "react";
import "../styles/Header.scss";

const Header = (props) => (
    <div className="header">
        {props.children}
        <hr />
    </div>
);

export default Header;