import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../store/ducks/userStore';
import { auctionsApi } from '../../services/auctionsApi';
import { AppBar, Toolbar, Typography, IconButton, TextField, MenuItem, Badge, Menu, Box } from '@material-ui/core';

// Material icons
import { Menu as MenuIcon, Input as InputIcon, Mail as MailIcon, Notifications as NotificationsIcon, AccountCircle } from '@material-ui/icons/';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import MainImage from '../../static/logo_psonia_cropped.png';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        //fontSize: '35px',
        //fontWeight: '600',
    },
    titleLink: {
        textDecoration: 'none',
        color: theme.palette.text.secondary,
    },
    noDecoration: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
    },
    //grow: {
    //  flexGrow: 1,
    //},
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
}));


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

function Navbar(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const user = props.user;
    function toggleSidebar() {
        const { dispatch } = props;
        dispatch(userActions.toggleSidebar());
    }


    function handleProfileMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleMenuClose() {
        setAnchorEl(null);
    }

    const { dispatch } = props;
    dispatch(auctionsApi.getAllAuctionsThunk([], '', null, null, null, null, null, 0, 5,));

    const classes = useStyles();
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
                    {/* <Typography variant="caption" className={classes.title}>
                        <NavLink
                            className={classes.titleLink}
                            to="/"
                        >
                            eBait
                        </NavLink>
                    </Typography> */}
                    <Box className={classes.title} >
                    <NavLink
                        to="/"
                    >
                        <img src={MainImage} style={{height:'50px', width:'auto'}}/>
                    </NavLink>
                    </Box>

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
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                //id={menuId}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                open={isMenuOpen}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleMenuClose}>
                                    <NavLink
                                        className={classes.noDecoration}
                                        to="/profile"
                                    >
                                        Profile
                                    </NavLink>
                                </MenuItem>
                                <MenuItem onClick={handleMenuClose}>
                                    <NavLink
                                        className={classes.noDecoration}
                                        to="/login"
                                    >
                                        Log Out
                                    </NavLink>
                                </MenuItem>
                            </Menu>

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


const connectedNavbar = connect(mapStateToProps)(Navbar);
export default connectedNavbar;