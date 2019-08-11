import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Material
import { Grid, Paper, Button } from '@material-ui/core';

// For importing my custom styles  
import useStyles from './styles';

import Sidebar from '../../sharedComp/Sidebar';

import ActionCard from './ActionCard';

export default function HomePage(props) {
    const classes = useStyles();

    return (
        <Sidebar>
            <div className={classes.root}>
                <Grid
                    className={classes.grid}
                    container
                    justify="center"
                >
                    <Grid
                        className={classes.quoteWrapper}
                        item
                        lg={8}
                    >
                        <Grid
                            className={classes.grid}
                            container
                            direction="column"
                            justify="center"
                        >


                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <ActionCard/>
                                </Grid>
                                <Grid item xs={6}>
                                    <ActionCard/>

                                </Grid>
                                <Grid item xs={6}>
                                    <ActionCard/>
                                </Grid>
                                <Grid item xs={6}>
                                    <ActionCard/>
                                </Grid>
                            </Grid>


                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Sidebar>
    );
}