import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const AdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        
        // EDW NA ELEGXW AN TO USERTYPE EINAI ADMIN 
        localStorage.getItem('user')
        // ME SIDEBAR
            ? <Sidebar> <Component {...props} /> </Sidebar>
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)