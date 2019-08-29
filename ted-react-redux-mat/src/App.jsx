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
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import BrowseAuctions from './pages/BrowseAuctions';
import MyAuctions from './pages/MyAuctions';
import CreateAuction from './pages/CreateAuction';

// import NotYetAccepted from './pages/NotYetAccepted';
import { AdminRoute } from './routes';
import { AuthAndVerRoute } from './routes';

// Styles
import useStyles from './styles';


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
    const { classes } = useStyles();
    console.log('layoutttt');
    
    return (
        <Sidebar>
            <div className={classes.layout} >
                {props.children}
            </div>
        </Sidebar>
    );
}



export default function App(props) {
    //const { classes } = props;

    return (
        <div>
            <MyNavbar />
            {/*<header className="App-header">*/}
            <Switch>
                {/*<PrivateRoute exact path="/login/aaa paradeigma gia exact path" component={HomePage} />*/}
                <Route exact path="/" component={HomePage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />

                <Route path="/notfound" component={NotFound} />

                <Route exact path="/browse" component={BrowseAuctions} />

                <Route exact path="/myauctions" component={MyAuctions} />

                <Route exact path="/myauctions/create-auction" component={CreateAuction} /> 

                {/* <Route path="/notyetaccepted" component={NotYetAccepted} /> */}

                <AdminRoute path="/admin" component={AdminPage}/>

                <Route exact path="/profile" component={ProfilePage}/>

{/*             kai ta 2 για το profile
                <Route path="/admin/usrID" component={AdminPage} />
                <Route path="/profile/usrID" component={AdminPage} /> */}

                {/* <AuthAndVerRoute render={() => <Redirect to="/" />} /> */}
                <Route render={() => <Redirect to="/" />} />
            </Switch>
            {/*</header>*/}
            <AlertSnackbar/>
            <Footer />
        </div>
    );
}