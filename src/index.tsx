import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Need for material UI
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from './theme/counselTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

ReactDOM.render(
  <React.Fragment>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </React.Fragment>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
