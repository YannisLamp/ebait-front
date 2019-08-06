import React from 'react';

import { Link, NavLink } from 'react-router-dom';

import { List, ListItem, ListItemIcon, ListItemText, 
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
  SettingsOutlined as SettingsIcon
} from '@material-ui/icons';

// For importing my custom styles  
import useStyles from './styles';


export default function CredentialForm(props) {
    const classes = useStyles();

    //const { handleChange, checkPasswordMatch, checkUsernameExists } = props;
    //const { passwordsMatch, usernameTaken } = props;

    return (
        <List
            component="div"
            disablePadding
        >
            <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/dashboard"
            >
                <ListItemIcon className={classes.listItemIcon}>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Dashboard"
                />
            </ListItem>
            <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/users"
            >
                <ListItemIcon className={classes.listItemIcon}>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Users"
                />
            </ListItem>
            <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/products"
            >
                <ListItemIcon className={classes.listItemIcon}>
                    <ShoppingBasketIcon />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Products"
                />
            </ListItem>
            <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/sign-in"
            >
                <ListItemIcon className={classes.listItemIcon}>
                    <LockOpenIcon />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Authentication"
                />
            </ListItem>
            <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/typography"
            >
                <ListItemIcon className={classes.listItemIcon}>
                    <TextFieldsIcon />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Typography"
                />
            </ListItem>
            <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/icons"
            >
                <ListItemIcon className={classes.listItemIcon}>
                    <ImageIcon />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Icons and Images"
                />
            </ListItem>
            <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/account"
            >
                <ListItemIcon className={classes.listItemIcon}>
                    <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Account"
                />
            </ListItem>
            <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/settings"
            >
                <ListItemIcon className={classes.listItemIcon}>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Settings"
                />
            </ListItem>
        </List>
    );
}