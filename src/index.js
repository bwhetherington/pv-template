import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { theme } from './theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import GoogleLogin from 'react-google-login';

function main() {
  // const responseGoogle = response => {
  //   console.log(response);
  // };

  // ReactDOM.render(
  //   <GoogleLogin
  //     clientId="401664781807-egsh9utlmmtf0ec5219erjkec1as9vur.apps.googleusercontent.com"
  //     buttonText="Login"
  //     onSuccess={responseGoogle}
  //     onFailure={responseGoogle}
  //   />,
  //   document.getElementById('app')
  // );
  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>,
    document.getElementById('app')
  );
}

main();
