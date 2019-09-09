import React, { Component } from 'react';

// Material
import { Grid, Paper } from '@material-ui/core';

// For importing my custom styles  
import { withStyles } from '@material-ui/core';
import { pageStyles } from '../pageStyles';

import Sidebar from '../../sharedComp/Sidebar';
import UserTable from './UserTable';
import UserVerification from './UserVerification';

import { usersApi } from '../../services';


const styles = theme => ({
    ...pageStyles(theme),
    pageWrapper: {
        marginTop: theme.spacing(12),
    },
    rightWrapper: {
        marginTop: theme.spacing(12),
        marginRight: theme.spacing(4),
    },
    paper: {
        width: '100%',
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        marginBottom: theme.spacing(2),
        minHeight: '80vh',
        //height: '75vh',
    },
    tableWrapper: {
        marginTop: theme.spacing(12),
        marginRight: theme.spacing(10),
    },
});


class AdminPage extends Component {

    state = {
        order: 'asc',
        orderBy: 'username',
        pageSize: 10,
        currPage: 0,

        users: [],
        totalPages: null,
        totalUsers: null,
        isLoading: true,

        userToVerify: null,
        isVerifying: false,
    };

    componentDidMount = () => {
        const { orderBy, order, pageSize, currPage } = this.state;
        this.queryTableData(orderBy, order, pageSize, currPage);
    }


    queryTableData = (orderBy, order, pageSize, currPage) => {
        // Start Loading
        this.setState((prevState, props) => {
            return { isLoading: true }
        })

        usersApi.getUsers(orderBy, order, pageSize, currPage)
            .then(data => {
                this.setState((prevState, props) => {

                    // At first select the first user of the table
                    // for information display
                    let firstUser = null;
                    if (data.users.length > 0) {
                        firstUser = data.users[0];
                    }

                    return {
                        users: data.users,
                        totalPages: data.totalPages,
                        totalUsers: data.totalUsers,
                        isLoading: false,
                        userToVerify: firstUser
                    }
                })
            });
    }

    handleRequestSort = (event, property) => {
        this.setState((prevState, props) => {
            const { order, orderBy, pageSize } = prevState;
            const isDesc = orderBy === property && order === 'desc';
            const newOrder = isDesc ? 'asc' : 'desc';

            // Also alters State and needs to know the new state
            this.queryTableData(property, newOrder, pageSize, 0);
            return {
                order: newOrder,
                orderBy: property,
                currPage: 0,
            }
        });
    }

    handleChangePage = (event, newPage) => {
        this.setState((prevState, props) => {
            const { order, orderBy, pageSize } = prevState;

            this.queryTableData(orderBy, order, pageSize, newPage);
            return {
                currPage: newPage
            }
        });
    }

    handleChangeRowsPerPage = (event) => {
        this.setState((prevState, props) => {
            const { order, orderBy } = prevState;
            const newPageSize = +event.target.value;

            this.queryTableData(orderBy, order, newPageSize, 0);
            return {
                currPage: 0,
                pageSize: newPageSize,
            }
        });

    }

    verifyUser = () => {
        const { userId } = this.state.userToVerify;
        this.setState((prevState, props) => { return { isVerifying: true } });
        usersApi.verifyUser(userId)
            .then(data => {
                const { order, orderBy, currPage, pageSize } = this.state;
                this.queryTableData(orderBy, order, pageSize, currPage);
                this.setState((prevState, props) => { return { isVerifying: false } });
            });
    }

    changeUser = (user) => {
        this.setState((prevState, props) => { return { userToVerify: user } });
    }


    render = () => {
        const { users, order, orderBy, pageSize, currPage, totalPages,
            totalUsers, isLoading, userToVerify, isVerifying } = this.state;

        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid
                    className={classes.grid}
                    container
                    //alignItems="center"
                    justify="center"
                >
                    <Grid
                        className={classes.tableWrapper}
                        item
                        lg={8}
                    >
                        <Paper className={classes.paper}>
                            <UserTable
                                order={order}
                                orderBy={orderBy}
                                pageSize={pageSize}
                                currPage={currPage}

                                users={users}
                                totalPages={totalPages}
                                totalUsers={totalUsers}
                                isLoading={isLoading}

                                changeUser={this.changeUser}
                                handleRequestSort={this.handleRequestSort}
                                handleChangePage={this.handleChangePage}
                                handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Grid>

                    <Grid
                        className={classes.rightWrapper}
                        item
                        lg={2}
                    >
                        <Paper className={classes.paper}>
                            <UserVerification
                                style={{ height: '100%' }}
                                user={userToVerify}
                                isLoading={isVerifying}
                                verifyUser={this.verifyUser}
                            />
                        </Paper>
                    </Grid>

                </Grid>
            </div>
        );
    }
}

const styledAdminPage = withStyles(styles)(AdminPage);
export default styledAdminPage;