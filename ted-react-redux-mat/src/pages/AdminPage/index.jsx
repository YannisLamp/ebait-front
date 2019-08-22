import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Material
import { Grid, Paper, Button } from '@material-ui/core';

// For importing my custom styles  
import { makeStyles } from '@material-ui/core/styles';
import { pageStyles } from '../pageStyles';


import Sidebar from '../../sharedComp/Sidebar';
import UserTable from './UserTable';


const useStyles = makeStyles(theme => ({
    ...pageStyles(theme),
}));


export default function AdminPage(props) {

    //componentDidMount() {
    //    this.props.dispatch(userActions.getAll());
    //}

    const classes = useStyles();

    return (
            <Sidebar>
                <div className={classes.root}>
                    <Grid
                        className={classes.grid}
                        container
                        //alignItems="center"
                        justify="center"
                    >
                        <Grid
                            className={classes.pageWrapper}
                            item
                            lg={10}
                        >
                            <Paper>
                                <UserTable />
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </Sidebar>
    );
}


/*function mapStateToProps(state) {
    const { auth } = state;
    const { user } = auth;
    return {
        user
    };
}*/

//const connectedHomePage = connect(mapStateToProps)(HomePage);
//export default connectedHomePage;




