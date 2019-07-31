import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const AdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        
        // EDW NA ELEGXW AN TO USERTYPE EINAI ADMIN 
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)