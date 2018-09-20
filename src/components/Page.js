import React from "react";
import '../styles/Page.scss';

export const App = (props) => (
    <div className="page">
        {props.children}
    </div>
);

export default App;