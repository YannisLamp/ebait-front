import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

// Material
import { Grid, Paper } from '@material-ui/core';

// For importing my custom styles  
import useStyles from './styles';

import SignUpQuote from './RegisterQuote';
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
                    lg={3}
                    xs={1}
                />
                {/*<Grid
                className={classes.quoteWrapper}
                item
                lg={5}
                >
                    <SignUpQuote/>
                </Grid>*/}
                <Grid
                    className={classes.content}
                    item
                    lg={6}
                    xs={10}
                    justify="center"
                >
                    <Paper>
                        <SignUpForm />
                    </Paper>
                </Grid>
                <Grid
                    lg={3}
                    xs={1}
                />
            </Grid>
        </div>
    );
}