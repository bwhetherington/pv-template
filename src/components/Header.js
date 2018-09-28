import React from "react";
import Divider from "./Divider";
import "../styles/Header.scss";

const Header = (props) => (
    <div className="header">
        {props.children}
        <Divider />
    </div>
);

export default Header;