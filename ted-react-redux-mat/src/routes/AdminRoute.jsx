import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';


function AdminRoute({ component: Component, user: user, ...rest }) {
    return (
        <Route {...rest} render={props => (
            (user && user.userRole === 'ADMIN')
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

const connectedAdminRoute = connect(mapStateToProps)(AdminRoute);
export { connectedAdminRoute as AdminRoute };