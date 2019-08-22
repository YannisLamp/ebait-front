import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Material
import { Grid, Paper, Button } from '@material-ui/core';

// For importing my custom styles  
import { makeStyles } from '@material-ui/core/styles';
import { pageStyles } from '../pageStyles';


import Sidebar from '../../sharedComp/Sidebar';
import UserInfo from '../../sharedComp/UserInfo';


const useStyles = makeStyles(theme => ({
    ...pageStyles(theme),
}));

export default function AdminPage(props) {

    const classes = useStyles();
    const user = props;

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
                            <Paper>
                                <UserInfo user={user} edit={false} />
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </Sidebar>
    );
}


function mapStateToProps(state) {
    const { auth } = state;
    const { user } = auth;
    return {
        user
    };
}

const connectedUserVerification = connect(mapStateToProps)(UserVerification);
export default connectedUserVerification;




