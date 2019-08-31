import React, { Component } from 'react';

// Material
import { Grid, Paper } from '@material-ui/core';

// For importing my custom styles  
import { withStyles } from '@material-ui/core';
import { pageStyles } from '../pageStyles';

import Sidebar from '../../sharedComp/Sidebar';

import { auctionsApi } from '../../services';

import AuctionFilters from './AuctionFilters';
import AuctionCardTable from './AuctionCardTable';


const styles = theme => ({
    ...pageStyles(theme),
    paper: {
        width: '100%',
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        marginBottom: theme.spacing(2),
        minHeight: '80vh',
    },
    filterWrapper: {
        marginTop: theme.spacing(14),
        marginRight: theme.spacing(10),
    },
});


class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            auctions: [],

            order: 'asc',
            orderBy: 'username',
            pageSize: 10,
            currPage: 0,
            
            users: [],
            totalPages: null,
            totalUsers: null,
            isLoading: false,

            userToVerify: null,
            isVerifying: false,
        };

        this.loadAuctions = this.loadAuctions.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleRequestSort = this.handleRequestSort.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    componentDidMount() {
        this.loadAuctions();
    }

    loadAuctions() {
        auctionsApi.getUserAuctions()
            .then(data => {
                console.log(data);
                this.setState((prevState, props) => {
                    return {
                        auctions: data,
                        totalAuctions: data.length,
                        isLoading: false,
                    }
                });
            });
    }


    

    handleRequestSort(event, property) {
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

    handleChangePage(event, newPage) {
        this.setState((prevState, props) => {
            const { order, orderBy, pageSize } = prevState;

            this.queryTableData(orderBy, order, pageSize, newPage);
            return {
                currPage: newPage
            }
        });
    }

    handleChangeRowsPerPage(event) {
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

    

    changeUser(user) {
        this.setState((prevState, props) => { return { userToVerify: user } });
    }


    render() {
        const { auctions, order, orderBy, pageSize, currPage, totalPages,
            totalUsers, isLoading, userToVerify, isVerifying } = this.state;
        
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
                            className={classes.filterWrapper}
                            item
                            lg={2}
                        >
                            <Paper className={classes.paper}>
                                <AuctionFilters 
                                
                                
                                />
                            </Paper>
                        </Grid>

                        <Grid
                            className={classes.rightWrapper}
                            item
                            lg={8}
                        >
                            <Paper className={classes.paper}>
                                <AuctionCardTable
                                    auctions={auctions}
                                    
                                    order={order}
                                    orderBy={orderBy}
                                    pageSize={pageSize}
                                    currPage={currPage}
                                    
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

                        

                    </Grid>
                </div>
            </Sidebar>
        );
    }
}

const styledAdminPage = withStyles(styles)(AdminPage);
export default styledAdminPage;