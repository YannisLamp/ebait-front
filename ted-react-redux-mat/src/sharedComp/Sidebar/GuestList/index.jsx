import React from 'react';

import { Link, NavLink } from 'react-router-dom';

import { List, ListItem, ListItemIcon, ListItemText, Divider,
    ListSubheader, Typography } from '@material-ui/core';

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
  SettingsOutlined as SettingsIcon,
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
                to="/auctions"
            >
                <ListItemIcon className={classes.listItemIcon}>
                    <ShoppingBasketIcon />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Browse Auctions"
                />
            </ListItem>

            <Divider className={classes.listDivider} />

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
                    primary="Log In"
                />
            </ListItem>
            
            
            
            
        </List>
    );
}