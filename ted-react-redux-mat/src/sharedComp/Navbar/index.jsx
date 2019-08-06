import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { authOperations } from '../../store/ducks/auth';
import { AppBar, Toolbar, Typography, Button, IconButton, TextField } from '@material-ui/core';

// Material icons
import { Menu, NotificationsOutlined, Input } from '@material-ui/icons/';
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

    function toggleSidebar() {
        const { dispatch } = props;
        dispatch(authOperations.toggleSidebar());
    }

    return (
        <div className={classes.root}>
            <ElevationScroll {...props}>
                <AppBar>
                    <Toolbar>
                        <IconButton 
                            edge="start" 
                            className={classes.menuButton} 
                            color="inherit" 
                            aria-label="Menu" 
                            onClick={toggleSidebar}
                        >
                            <Menu />
                        </IconButton>
                        <Typography variant="caption" className={classes.title}>
                            <NavLink
                                className={classes.titleLink}
                                to="/"
                            >
                                EMERLD
                            </NavLink>
                        </Typography>

                        <IconButton color="inherit">
                            <Input />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </div>
    );
}


function mapStateToProps(state) {
    const { auth } = state;
    const { user, sidebarOpen } = auth;
    return {
        user
    };
}


const connectedButtonAppBar = connect(mapStateToProps)(ButtonAppBar);
export default connectedButtonAppBar;