import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Material
import { Grid, Paper, Button } from '@material-ui/core';

// For importing my custom styles  
import useStyles from './styles';

import Sidebar from '../../sharedComp/Sidebar';
//import { UserTable } from './UserTable';
import UserTableHead from './UserTable/UserTableHead';

export default function AdminPage(props) {

    //componentDidMount() {
    //    this.props.dispatch(userActions.getAll());
    //}

    const classes = useStyles();

    return (

            <Sidebar className={classes.sidebar}>
                <div className={classes.root}>
                    <Grid
                        className={classes.grid}
                        container
                        //alignItems="center"
                        justify="center"
                    >
                        <Grid
                            className={classes.quoteWrapper}
                            item
                            lg={10}
                        >
                            <Paper>
                                <UserTableHead />
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




