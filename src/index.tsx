import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Need for material UI
import 'typeface-roboto';
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import {theme} from './theme/counselTheme';

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
    <React.Fragment>
      <CssBaseline />
      <App />
    </React.Fragment>
  </MuiThemeProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
