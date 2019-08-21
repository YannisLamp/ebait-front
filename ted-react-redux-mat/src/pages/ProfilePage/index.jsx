import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Material
import { Grid, Paper, Button } from '@material-ui/core';

// For importing my custom styles  
import useStyles from './styles';

import Sidebar from '../../sharedComp/Sidebar';
import UserInfo from '../../sharedComp/UserInfo';

function ProfilePage(props) {

    const classes = useStyles();
    const { user } = props;

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
                                <UserInfo user={user} edit={false} />
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </Sidebar>
    );
}


function mapStateToProps(state) {
    const { userStore } = state;
    const { user } = userStore;
    return {
        user
    };
}

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export default connectedProfilePage;




