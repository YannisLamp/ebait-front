import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

// Material
import { Grid, Paper, Button } from '@material-ui/core';

// For importing my custom styles  
import useStyles from './styles';

import LoginQuote from './LoginQuote';
import LoginForm from './LoginForm';

export default function Login(props) {

    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>
                <Grid
                    className={classes.grid}
                    container
                >
                    <Grid
                        item
                        lg={1}
                        xs={1}
                    />
                    <Grid
                        className={classes.quoteWrapper}
                        item
                        lg={5}
                    >
                        <LoginQuote />
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        xs={10}
                    >
                        <Grid 
                            className={classes.grid}
                            container
                            direction="column"
                            justify="center"
                        >
                            <Paper>
                                <LoginForm />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        lg={2}
                        xs={1}
                    />
                </Grid>
            </div>
        </div>
    );
}