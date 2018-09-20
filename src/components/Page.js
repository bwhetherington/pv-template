import React from "react";
import Navbar from "./Navbar";
import '../styles/Page.scss';

export const App = (props) => (
    <div className="page">
        <Navbar />
        <div className="content">
            {props.children}
        </div>
    </div>
);

export default App;