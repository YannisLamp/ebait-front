import React from 'react';
import { Link } from 'react-router-dom';

// Material
import { Grid, Paper, Button } from '@material-ui/core';

// For importing my custom styles  
import { makeStyles } from '@material-ui/core/styles';
import { pageStyles } from '../pageStyles';

import Sidebar from '../../sharedComp/Sidebar';
import AuctionForm from './AuctionForm';


const useStyles = makeStyles(theme => ({
    ...pageStyles(theme),
    paper: {
        width: '100%',
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        marginBottom: theme.spacing(2),
        minHeight: '80vh',
    },
}));

export default function MyAuctions(props) {

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
                        className={classes.pageWrapper}
                        item
                        lg={10}
                    >
                        <Paper className={classes.paper}>
                            {/* <AuctionForm /> */}
                        </Paper>
                    </Grid>

                </Grid>
            </div>
        </Sidebar>
    );
}




