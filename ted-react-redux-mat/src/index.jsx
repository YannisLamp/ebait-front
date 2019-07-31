import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import store from './store';
import { history } from './utils';
import App from './App';

import 'typeface-roboto';

// Material
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

import * as serviceWorker from './serviceWorker';

// Just Providers here, and the main App of course
ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Router history={history}>
                <App />
            </Router>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
