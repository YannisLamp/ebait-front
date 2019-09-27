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
import CreateAuction from './pages/AuctionOperations/CreateAuction';
import EditAuction from './pages/AuctionOperations/EditAuction';
import ViewAuction from './pages/ViewAuction';
import Messages from './pages/Messages';

import ImportExportPage from './pages/ImportExportPage';

import { AdminRoute } from './routes';
import { VerifiedRoute } from './routes';
import { UserRoute } from './routes';

import 'react-image-lightbox/style.css'; // This only needs to be imported once
import 'react-awesome-slider/dist/styles.css';

export default function App(props) {

    return (
        <div>
            <MyNavbar />
            {/* Encapsulate all pages with a sidebar */}
            <Sidebar>

                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/browse" component={BrowseAuctions} />

                    <Route exact path="/viewauction/:id" component={ViewAuction} />

                    <Route path="/notfound" component={NotFound} />

                    <UserRoute exact path="/profile" component={ProfilePage} />

                    <VerifiedRoute exact path="/myauctions" component={MyAuctions} />
                    <VerifiedRoute exact path="/myauctions/create-auction" component={CreateAuction} />
                    <VerifiedRoute exact path="/myauctions/edit-auction" component={EditAuction} />
                    <VerifiedRoute exact path="/messages" component={Messages} />

                    <AdminRoute path="/verify" component={AdminPage} />
                    <AdminRoute path="/import-export" component={ImportExportPage} />

                    <Route render={() => <Redirect to="/" />} />
                </Switch>

            </Sidebar>

            <AlertSnackbar />
            <Footer />
        </div>
    );
}