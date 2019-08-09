import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Material
import { Grid, Paper, Button } from '@material-ui/core';

// For importing my custom styles  
import useStyles from './styles';

import Sidebar from '../../sharedComp/Sidebar'

export default function HomePage(props) {
    //componentDidMount() {
    //    this.props.dispatch(userActions.getAll());
    //}

    const classes = useStyles();

    return (
        <div>

            <Sidebar className={classes.sidebar}>
                <div className={classes.root}>
                    <Grid
                        className={classes.grid}
                        container
                    >
                        <Grid
                            className={classes.quoteWrapper}
                            item
                            lg={5}
                        >
                            <h1>Hi, this is the HomePage</h1>
                        </Grid>
                    </Grid>
                </div>
            </Sidebar>
        </div>
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