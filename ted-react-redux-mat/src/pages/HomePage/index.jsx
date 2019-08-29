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
import WarningMsg from './WarningMsg';


const useStyles = makeStyles(theme => ({
    ...pageStyles(theme),
}));

function HomePage(props) {
    const { user } = props;
    const hasPriv = user.userRole === 'GUEST' || (user.userRole === 'USER' && user.verified === false) ? false : true;

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
                                
                                <Grid item xs={12}>
                                    <WarningMsg 
                                        style={{ borderColor: 'red' }}
                                        warningText="Warwarwar"  
                                        backgroundColor='white'
                                        borderColor='red'
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <ActionCard 
                                        title="Browse Auctions" 
                                        bodyText="explanation paopap" 
                                        to="/browse" 
                                        backgroundColor="#29aa9f"
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <ActionCard 
                                        title="My Auctions" 
                                        bodyText="explanation paopap"
                                        to="/myauctions" 
                                        backgroundColor="#5fba43"
                                        disabled={!hasPriv}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <ActionCard 
                                        title="Messages" 
                                        bodyText="explanation paopap" 
                                        backgroundColor="#863a81" 
                                        disabled={!hasPriv}
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
                                        disabled={!hasPriv}
                                    />
                                </Grid>

                                { user.userRole === 'ADMIN' ? (
                                    <Grid item xs={12}>
                                        <ActionCard 
                                            title="Verify Users" 
                                            bodyText="explanation paopap"
                                            to="/admin" 
                                            backgroundColor="#ea7e3e"
                                        />
                                    </Grid>
                                ) :
                                    ''
                                }

                            </Grid>


                        </Grid>
                    </Grid>
                </Grid>
        </Sidebar>
        </div>
    );
}


function mapStateToProps(state) {
    const { userStore } = state;
    const { user } = userStore;
    return {
        user,
    };
}


const connectedHomePage = connect(mapStateToProps)(HomePage);
export default connectedHomePage;