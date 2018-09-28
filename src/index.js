import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom'
import App from "./components/App";

import "./styles/index.scss";

import { theme } from "./theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </MuiThemeProvider>,
    document.getElementById("app")
);