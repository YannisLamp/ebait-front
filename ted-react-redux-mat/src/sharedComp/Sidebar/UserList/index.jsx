import React from 'react';

import { NavLink } from 'react-router-dom';

import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';

// Material icons
import {
  DashboardOutlined as DashboardIcon,
  ShoppingBasketOutlined as ShoppingBasketIcon,
  LockOpenOutlined as LockOpenIcon,
  AccountBoxOutlined as AccountBoxIcon,
  MessageOutlined as MessageIcon,
  LibraryAddOutlined as LibraryAddOutlinedIcon
} from '@material-ui/icons';

// For importing my custom styles  
import useStyles from '../styles';

// Fix for NavLink forward Ref bug as seen below
// https://github.com/mui-org/material-ui/issues/15903 
const ForwardNavLink = React.forwardRef((props, ref) => (
    <NavLink {...props} innerRef={ref} />
));

export default function UserList(props) {
    const classes = useStyles();

    return (
        <List
            component="div"
            disablePadding
        >
            <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={ForwardNavLink}
                exact
                to="/"
            >
                <ListItemIcon className={classes.listItemIcon}>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Home"
                />
            </ListItem>
            
            <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={ForwardNavLink}
                to="/browse"
            >
                <ListItemIcon className={classes.listItemIcon}>
                    <ShoppingBasketIcon />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Browse Auctions"
                />
            </ListItem>


            <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={ForwardNavLink}
                to="/myauctions"
            >
                <ListItemIcon className={classes.listItemIcon}>
                    <LibraryAddOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="My Auctions"
                />
            </ListItem>

            <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={ForwardNavLink}
                to="/messages"
            >
                <ListItemIcon className={classes.listItemIcon}>
                    <MessageIcon />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Messages"
                />
            </ListItem>

            <Divider className={classes.listDivider} />

            <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={ForwardNavLink}
                to="/profile"
            >
                <ListItemIcon className={classes.listItemIcon}>
                    <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Profile"
                />
            </ListItem>


            <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={ForwardNavLink}
                to="/login"
            >
                <ListItemIcon className={classes.listItemIcon}>
                    <LockOpenIcon />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Log Out"
                />
            </ListItem>
            
            
            

            
            
        </List>
    );
}