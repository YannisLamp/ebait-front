import React, { Component } from 'react';

// Material
import { Grid, Paper } from '@material-ui/core';

// For importing my custom styles  
import { withStyles } from '@material-ui/core';
import { pageStyles } from '../pageStyles';


import Sidebar from '../../sharedComp/Sidebar';
import UserTable from './UserTable';
import UserVerification from './UserVerification';


const styles = theme => ({
    ...pageStyles(theme),
    paper: {
        width: '100%',
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        marginBottom: theme.spacing(2),
        minHeight: '75vh',
    },
});


class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userToVerify: null
        };

        this.changeUser = this.changeUser.bind(this);
    }



    changeUser(user) {
        console.log('changing user');
        console.log(user);
        this.setState((prevState, props) => { return { userToVerify: user } });
    }


    render() {
        const { userToVerify } = this.state;
        const { classes } = this.props;

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
                            lg={8}
                        >
                            <Paper className={classes.paper}>
                                <UserTable changeUser={this.changeUser} />
                            </Paper>
                        </Grid>

                        <Grid
                            className={classes.pageWrapper}
                            item
                            lg={1}
                        >
                        </Grid>

                        <Grid
                            className={classes.pageWrapper}
                            item
                            lg={2}
                        >
                            <Paper className={classes.paper}>
                                <UserVerification user={userToVerify} />
                            </Paper>
                        </Grid>

                    </Grid>
                </div>
            </Sidebar>
        );
    }


}

const styledAdminPage = withStyles(styles)(AdminPage);
export default styledAdminPage;