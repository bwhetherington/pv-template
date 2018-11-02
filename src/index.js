import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { theme } from './theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const main = () => {
  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>,
    document.getElementById('app')
  );
};

main();
