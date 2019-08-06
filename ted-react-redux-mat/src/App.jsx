import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import MyNavbar from './sharedComp/Navbar';
import Footer from './sharedComp/Footer';
import AlertSnackbar from './sharedComp/AlertSnackbar';
import Sidebar from './sharedComp/Sidebar';

import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';

import { PrivateRoute } from './routes';

// Styles
import { withStyles } from '@material-ui/core';
import styles from './styles';


//{!this.state.user && <Redirect to='/login' />}

/*const MainLayout = props => (
    <div>
      <h1>Main</h1>
      {props.children}
    </div>
  )
  
  <AppRoute exact path="/foo" layout={MainLayout} component={Foo} />
  
  
  */

function LayoutWithSidebar(props) {
    return (
        <Sidebar>
            {props.children}
        </Sidebar>
    );
}



function App(props) {
    const { classes } = props;

    return (
        <div>
            <MyNavbar />
            {/*<header className="App-header">*/}
            <Switch>
                {/*<PrivateRoute exact path="/login/aaa paradeigma gia exact path" component={HomePage} />*/}
                <Route exact path="/" layout={LayoutWithSidebar} component={HomePage} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />

                <Route path="/notfound" component={NotFound} />


                <PrivateRoute render={() => <Redirect to="/" />} />
                <Route render={() => <Redirect to="/login" />} />
            </Switch>
            {/*</header>*/}
            <AlertSnackbar/>
            <Footer />
        </div>
    );
}

const styledApp = withStyles(styles)(App);
export default styledApp;