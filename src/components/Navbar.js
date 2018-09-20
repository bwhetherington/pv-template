import React from "react";
import "../styles/Navbar.scss";

const Navbar = (props) => (
    <div className="navbar">
        <span className="left">
            <a className="link" href="/"><strong>PreserVenice</strong></a>
        </span>
        <span className="right">
            <a className="link" href="/artifacts">Artifacts</a>
            <a className="link" href="/about">About</a>
            <a className="link" href="/contact">Contact</a>
        </span>
    </div>
);

export default Navbar;