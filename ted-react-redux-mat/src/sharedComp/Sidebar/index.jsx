import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import clsx from 'clsx';
import { connect } from 'react-redux';

import {
    Avatar, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText,
    ListSubheader, Typography, IconButton
} from '@material-ui/core';

import LimitedList from './LimitedList';
import UserList from './UserList';
import AdminList from './AdminList';

// Component styles
import useStyles from './styles';



function Sidebar(props) {
    const classes = useStyles();
    const sidebarOpen = props.sidebarOpen;
    const user = props.user;

    function profileCredentials() {
        if (!user) {
            return (
                <>
                    <Avatar className={classes.userLogo}>
                        G
                    </Avatar>

                    <Typography
                        className={classes.usernameText}
                        variant="h5"
                    >
                        Guest
                    </Typography>
                </>
            );
        }
        else {
            return (
                <>
                    <NavLink to="/profile" className={classes.notDecorated}>
                        <Avatar className={classes.userLogo}>
                            {user.firstName.charAt(0) + user.lastName.charAt(0)}
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
                    <br/>
                    <br/>
                    <Typography
                        className={classes.bioText}
                        variant="h6"
                    >
                        {user.userRole === 'ADMIN' ? 'Administrator' : ''}
                    </Typography>
                </>
            );
        }
    }

    function getList() {
        if (!user) {
            return (<LimitedList />);
        }
        else if (user.userRole === 'USER' && user.verified === false) {
            return (<LimitedList userRole={'USER'} />);
        }
        else if (user.userRole === 'USER') {
            return (<UserList />);
        }
        else {
            return (<AdminList />);
        }
    }

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
                    {profileCredentials()}
                </div>

                <Divider className={classes.profileDivider} />

                {getList()}

                <Divider className={classes.listDivider} />

            </Drawer>

            <div
                className={clsx(classes.content, { [classes.contentShift]: sidebarOpen, })}
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