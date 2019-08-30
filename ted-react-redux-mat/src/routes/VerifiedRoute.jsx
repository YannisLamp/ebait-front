import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';


function VerifiedRoute({ component: Component, user: user, ...rest }) {
    return (
        <Route {...rest} render={props => (
            // ME SIDEBAR
            // ? <Sidebar> <Component {...props} /> </Sidebar>
            (user.userRole === 'USER' && user.verified === true) || user.userRole === 'ADMIN'
                ? <Component {...props} />
                : <Redirect to='/' />
        )} />
    );
}


function mapStateToProps(state) {
    const { userStore } = state;
    const { user } = userStore;
    return {
        user,
    };
}

const connectedVerifiedRoute = connect(mapStateToProps)(VerifiedRoute);
export { connectedVerifiedRoute as VerifiedRoute };