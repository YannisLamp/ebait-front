import React from 'react';

import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { pageStyles } from '../pageStyles';

import RegisterForm from './RegisterForm';


const useStyles = makeStyles(theme => ({
    ...pageStyles(theme),
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    registerPaper: {
        minHeight: '70vh',
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(1),
    },
}));

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
                        <Paper className={classes.registerPaper}>
                            <RegisterForm />
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