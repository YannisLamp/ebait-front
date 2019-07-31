import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import MyNavbar from './sharedComp/Navbar';
import Footer from './sharedComp/Footer';

import Login from './pages/Login';
import Register from './pages/Register';
import { HomePage } from './pages/HomePage/HomePage';

import { PrivateRoute } from './routes';

// Styles
import { withStyles } from '@material-ui/core';
import styles from './styles';

//{!this.state.user && <Redirect to='/login' />}


function App(props) {
    const { classes } = props;

    return (
        <div>
            <MyNavbar />
            {/*<header className="App-header">*/}
            <Switch>
                <PrivateRoute exact path="/" component={HomePage} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />

                <PrivateRoute render={() => <Redirect to="/" />} />
                <Route render={() => <Redirect to="/login" />} />
            </Switch>
            {/*</header>*/}
            <Footer />
        </div>
    );
}

const styledApp = withStyles(styles)(App);
export default styledApp;
