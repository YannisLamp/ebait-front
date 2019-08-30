import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../store/ducks/userStore';
import { AppBar, Toolbar, Typography, Button, IconButton, TextField, Box, Badge, Menu } from '@material-ui/core';

// Material icons
import { Menu as MenuIcon, Input as InputIcon, Mail as MailIcon, Notifications as NotificationsIcon, AccountCircle } from '@material-ui/icons/';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import useStyles from './styles';

function ElevationScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

function ButtonAppBar(props) {
    const classes = useStyles();

    const user = props.user;

    function toggleSidebar() {
        const { dispatch } = props;
        dispatch(userActions.toggleSidebar());
    }

    return (
        <ElevationScroll {...props}>
            <AppBar>
                <Toolbar>
                    {/* <Box visibility={user ? "visible" : "hidden"}> */}
                    <Box>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="secondary"
                            aria-label="Menu"
                            onClick={toggleSidebar}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Typography variant="caption" className={classes.title}>
                        <NavLink
                            className={classes.titleLink}
                            to="/"
                        >
                            eBait
                        </NavLink>
                    </Typography>

                    {/* <div className={classes.grow} /> */}
                    {user ? (
                        <div className={classes.sectionDesktop}>
                            <IconButton aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={4} color="primary">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            {/* <IconButton aria-label="show 17 new notifications" color="inherit">
                                    <Badge badgeContent={17} color="secondary">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton> */}
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                // aria-controls={menuId}
                                aria-haspopup="true"
                                // onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                    ) : (
                        <NavLink
                            className={classes.titleLink}
                            to="/login"
                        >
                            <IconButton color="inherit">
                                <InputIcon />
                            </IconButton>
                        </NavLink>
                    )}
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    );
}


function mapStateToProps(state) {
    const { userStore } = state;
    const { user, sidebarOpen } = userStore;
    return {
        user
    };
}


const connectedButtonAppBar = connect(mapStateToProps)(ButtonAppBar);
export default connectedButtonAppBar;