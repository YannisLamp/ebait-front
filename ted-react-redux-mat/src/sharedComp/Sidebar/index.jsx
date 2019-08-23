import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import clsx from 'clsx';
import { connect } from 'react-redux';

import {
    Avatar, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText,
    ListSubheader, Typography, IconButton
} from '@material-ui/core';


import UserList from './UserList';
import AdminList from './AdminList';

// Component styles
import useStyles from './styles';



function Sidebar(props) {

    //onClose={this.handleClose}
    //variant={isMobile ? 'temporary' : 'persistent'}

    const classes = useStyles();
    const sidebarOpen = props.sidebarOpen;
    const user = props.user;

    return (
        <div className={classes.root}>
            <Drawer
                anchor="left"
                classes={{ paper: classes.drawerPaper }}
                open={sidebarOpen}
                className={classes.drawer}
                variant="persistent"
            >
                    <div className={classes.profile}>
                        <NavLink to="/profile" className={classes.notDecorated}>
                            <Avatar className={classes.userLogo}>
                                {user.firstName && user.lastName ? 
                                    user.firstName.charAt(0) + user.lastName.charAt(0) 
                                :   
                                    'G'
                                }
                            </Avatar>
                        </NavLink>

                        <Typography
                            className={classes.usernameText}
                            variant="h5"
                        >
                            {user.username}
                        </Typography>

                        <Typography
                            className={classes.nameText}
                            variant="h6"
                        >
                            {user.firstName}{' '}{user.lastName}
                        </Typography>
                        <Typography
                            className={classes.bioText}
                            variant="caption"
                        >
                            {user.userRole === 'USER' ? 'User' : 'Administrator'}
                        </Typography>
                    </div>
                    <Divider className={classes.profileDivider} />

                        { user.userRole === 'USER' ? <UserList /> : <AdminList /> }
                    


                    <Divider className={classes.listDivider} />
                    

            </Drawer>
            
            <div 
                className={clsx(classes.content, {[classes.contentShift]: sidebarOpen,})}
            >

                {props.children}

            </div>

        </div>
    );
}




function mapStateToProps(state) {
    const { userStore } = state;
    const { user, sidebarOpen } = userStore;
    return {
        user,
        sidebarOpen
    };
}


const connectedSidebar = connect(mapStateToProps)(Sidebar);
export default connectedSidebar;