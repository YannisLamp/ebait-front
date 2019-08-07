import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import {
    Avatar, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText,
    ListSubheader, Typography
} from '@material-ui/core';

// Material icons
import {
    DashboardOutlined as DashboardIcon,
    PeopleOutlined as PeopleIcon,
    ShoppingBasketOutlined as ShoppingBasketIcon,
    LockOpenOutlined as LockOpenIcon,
    TextFields as TextFieldsIcon,
    ImageOutlined as ImageIcon,
    InfoOutlined as InfoIcon,
    AccountBoxOutlined as AccountBoxIcon,
    SettingsOutlined as SettingsIcon
} from '@material-ui/icons';


import UserList from './UserList';

// Component styles
import useStyles from './styles';



function Sidebar(props) {

    //onClose={this.handleClose}
    //variant={isMobile ? 'temporary' : 'persistent'}

    const classes = useStyles();
    const sidebarOpen = props.sidebarOpen;

    return (
        <div className={classes.root}>
        <Drawer
            anchor="left"
            classes={{ paper: classes.drawerPaper }}
            open={sidebarOpen}
            className={classes.drawer}
            variant="persistent"
        >
            <nav className={classes.root}>
                <div className={classes.profile}>
                    <Link to="/account">
                        <Avatar
                            alt="Roman Kutepov"
                            className={classes.avatar}
                            src="/images/avatars/avatar_1.png"
                        />
                    </Link>
                    <Typography
                        className={classes.nameText}
                        variant="h6"
                    >
                        Roman Kutepov
                    </Typography>
                    <Typography
                        className={classes.bioText}
                        variant="caption"
                    >
                        Brain Director
          </Typography>
                </div>
                <Divider className={classes.profileDivider} />


                {/*<UserList />*/}


                <Divider className={classes.listDivider} />
                <List
                    component="div"
                    disablePadding
                    subheader={
                        <ListSubheader className={classes.listSubheader}>
                            Support
            </ListSubheader>
                    }
                >
                    <ListItem
                        className={classes.listItem}
                        component="a"
                        href="https://devias.io/contact-us"
                        target="_blank"
                    >
                        <ListItemIcon className={classes.listItemIcon}>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                            classes={{ primary: classes.listItemText }}
                            primary="Customer support"
                        />
                    </ListItem>
                </List>
            </nav>

        </Drawer>

                    
        {props.children}

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