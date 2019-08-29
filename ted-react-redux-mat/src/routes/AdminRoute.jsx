import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';


export function AdminRoute({ component: Component, ...rest }) { 
    const user = localStorage.getItem('user');
    console.log(user);
    return (
        <Route {...rest} render={props => (
            
            // EDW NA ELEGXW AN TO USERTYPE EINAI ADMIN 
            
            // ME SIDEBAR
                // ? <Sidebar> <Component {...props} /> </Sidebar>
                true
                ? <Component {...props} />
                : <Redirect to='/' />
        )} />
    );
}


// const connectedHomePage = connect(mapStateToProps)(HomePage);
// export default connectedHomePage;