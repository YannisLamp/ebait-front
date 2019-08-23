import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Material
import { Grid, Paper, Button } from '@material-ui/core';

// For importing my custom styles  
import { makeStyles } from '@material-ui/core/styles';
import { pageStyles } from '../pageStyles';

import Sidebar from '../../sharedComp/Sidebar';

import ActionCard from './ActionCard';


const useStyles = makeStyles(theme => ({
    ...pageStyles(theme),
}));

export default function HomePage(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
        <Sidebar>
            
                <Grid
                    container
                    justify="center"
                >
                    <Grid
                        item
                        lg={8}
                    >
                        <Grid
                            className={classes.grid}
                            container
                            direction="column"
                            justify="center"
                        >


                            <Grid container spacing={3} style={{marginTop: '55px'}}>
                                <Grid item xs={6}>
                                    <ActionCard 
                                        title="Browse Auctions" 
                                        bodyText="explanation paopap" 
                                        //to="/lalaal" 
                                        backgroundColor="#29aa9f"
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <ActionCard 
                                        title="Messages" 
                                        bodyText="explanation paopap" 
                                        backgroundColor="#863a81" 
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <ActionCard 
                                        title="Create Auction" 
                                        bodyText="explanation paopap"
                                        to="/create-auction" 
                                        backgroundColor="#5fba43" 
                                    />

                                </Grid>
                                {/* <Grid item xs={6}>
                                    <ActionCard title="Messages" bodyText="explanation paopap" backgroundColor="#ea7e3e" />
                                </Grid> */}

                                
                                
                                <Grid item xs={6}>
                                    <ActionCard 
                                        title="Profile" 
                                        bodyText="explanation paopap"
                                        to="/profile" 
                                        backgroundColor="#e9a127" 
                                    />
                                </Grid>
                            </Grid>


                        </Grid>
                    </Grid>
                </Grid>
        </Sidebar>
        </div>
    );
}