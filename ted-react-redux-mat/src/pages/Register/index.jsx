import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

// Material
import { Grid, Paper } from '@material-ui/core';

// For importing my custom styles  
import useStyles from './styles';

import SignUpForm from './RegisterForm';

export default function Register(props) {

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid
                className={classes.grid}
                container
            >
                <Grid
                    item
                    lg={4}
                    xs={2}
                />
                <Grid
                    container
                    justify="center"
                >
                    <Grid
                        className={classes.content}
                        item
                        lg={4}
                        xs={8}
                    >
                        <Paper className={classes.formPaper}>
                            <SignUpForm />
                        </Paper>
                    </Grid>
                </Grid>
                <Grid
                    item
                    lg={4}
                    xs={2}
                />
            </Grid>
        </div>
    );
}