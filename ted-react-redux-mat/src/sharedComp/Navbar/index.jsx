import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../store/ducks/userStore';
import { auctionsApi } from '../../services/auctionsApi';
import { messageApi } from '../../services/messageApi';

import { AppBar, Toolbar, Typography, IconButton, TextField, MenuItem, Badge, Menu, Box } from '@material-ui/core';

// Material icons
import { Menu as MenuIcon, Input as InputIcon, Mail as MailIcon, Notifications as NotificationsIcon, AccountCircle } from '@material-ui/icons/';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import MainImage from '../../static/logo_psonia_cropped.png';

import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
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
});


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

class Navbar extends Component {

    state = {
        anchorEl: null,
    }

    componentDidMount() {
        const { notifications, dispatch } = this.props;
        dispatch(auctionsApi.initFromScratchThunk());

        this.dataPolling = setInterval( 
            () => { 
                if (this.props.user) {
                    dispatch(messageApi.refreshInboxThunk(notifications));
                }
            },
            20000
        );
    }

    componentWillUnmount() {
        clearInterval(this.dataPolling);
    }

    toggleSidebar = () => {
        const { dispatch } = this.props;
        dispatch(userActions.toggleSidebar());
    }

    handleProfileMenuOpen = (event) => {
        //setAnchorEl(event.currentTarget);
        const target = event.currentTarget;
        this.setState((prevState, props) => {
            return {
                anchorEl: target
            }
        });
    }

    handleMenuClose = () => {
        //setAnchorEl(null);
        this.setState((prevState, props) => {
            return {
                anchorEl: null
            }
        });
    }


    render() {
        const { anchorEl } = this.state;
        const isMenuOpen = Boolean(anchorEl);

        const { classes, user, notifications } = this.props;
        return (
            <ElevationScroll {...this.props}>
                <AppBar>
                    <Toolbar>
                        <Box>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="secondary"
                                aria-label="Menu"
                                onClick={this.toggleSidebar}
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
                                <img src={MainImage} style={{ height: '50px', width: 'auto' }} />
                            </NavLink>
                        </Box>

                        {/* <div className={classes.grow} /> */}
                        {user ? (
                            <div className={classes.sectionDesktop}>
                                <IconButton color="inherit">
                                    <Badge badgeContent={notifications} color="primary">
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
                                    onClick={this.handleProfileMenuOpen}
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
                                    onClose={this.handleMenuClose}
                                >
                                    <MenuItem onClick={this.handleMenuClose}>
                                        <NavLink
                                            className={classes.noDecoration}
                                            to="/profile"
                                        >
                                            Profile
                                    </NavLink>
                                    </MenuItem>
                                    <MenuItem onClick={this.handleMenuClose}>
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
}


function mapStateToProps(state) {
    const { userStore, messageStore } = state;
    const { user } = userStore;
    const { notifications } = messageStore;
    return {
        user,
        notifications
    };
}


const connectedNavbar = connect(mapStateToProps)(Navbar);
const styledNavbar = withStyles(styles)(connectedNavbar);
export default styledNavbar;