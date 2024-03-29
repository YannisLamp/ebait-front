import React from 'react';

import { Grid, Paper } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { pageStyles } from '../pageStyles';

import LoginQuote from './LoginQuote';
import LoginForm from './LoginForm';

//import Image from '../../item_default.jpg';

const useStyles = makeStyles(theme => ({
    ...pageStyles(theme),
    // backImg: {
    //     backgroundImage: `url(${Image})`,
    //     backgroundSize: 'cover',
    //     backgroundRepeat: 'no-repeat',
    //     backgroundPosition: 'center',
    // },
    quoteWrapper: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    },
    signInPaper: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        marginTop: theme.spacing(9),
        marginBottom: theme.spacing(1),
    },
}));

export default function Login(props) {

    const classes = useStyles();

    return (
        <div>

            <div className={classes.root + ' ' + classes.backImg}>
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
                            <Paper className={classes.signInPaper}>
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