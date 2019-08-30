import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';


function UserRoute({ component: Component, user: user, ...rest }) {
    return (
        <Route {...rest} render={props => (
            user.userRole === 'USER' || user.userRole === 'ADMIN' 
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

const connectedUserRoute = connect(mapStateToProps)(UserRoute);
export { connectedUserRoute as UserRoute };