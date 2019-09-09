import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Material
import { Grid, Paper, Button } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { pageStyles } from '../pageStyles';

import Sidebar from '../../sharedComp/Sidebar';

import MyAuctionsTable from './MyAuctionsTable';

import { auctionsApi } from '../../services'



const styles = theme => ({
    ...pageStyles(theme),
    paper: {
        width: '100%',
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        marginBottom: theme.spacing(2),
        minHeight: '80vh',
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    tableWrapper: {
        marginTop: theme.spacing(12),
        marginRight: theme.spacing(10),
    },
    auctionButton: {
        marginBottom: theme.spacing(4),
    }
});

class MyAuctions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageSize: 5,
            currPage: 0,
            auctions: [],
            totalAuctions: '',

            order: '',
            orderBy: '',

            isLoading: true,
        };

        this.loadAuctions = this.loadAuctions.bind(this);

        this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);

        this.startAuction = this.startAuction.bind(this);
        this.deleteAuction = this.deleteAuction.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleRequestSort = this.handleRequestSort.bind(this);
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

    handleChange(e) {
        const { name, value } = e.target;
        this.setState((prevState, props) => { return { [name]: value } });
    }

    handleChangePage(event, newPage) {
        this.setState((prevState, props) => {
            //const { order, orderBy, pageSize } = prevState;
            //this.queryTableData(orderBy, order, pageSize, newPage);
            return {
                currPage: newPage
            }
        });
    }

    handleChangeRowsPerPage(event) {
        this.setState((prevState, props) => {
            //const { order, orderBy } = prevState;
            const newPageSize = +event.target.value;

            //this.queryTableData(orderBy, order, newPageSize, 0);
            return {
                currPage: 0,
                pageSize: newPageSize,
            }
        });
    }

    handleRequestSort() {

    }

    startAuction(itemID) {
        auctionsApi.startAuction(itemID)
            .then(data => {
                this.loadAuctions();
            });
    }

    deleteAuction(itemID) {
        auctionsApi.deleteAuction(itemID)
            .then(data => {
                this.loadAuctions();
            });
    }

    render() {
        const { pageSize, currPage, auctions, totalAuctions, order, orderBy, isLoading } = this.state;

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
                        lg={10}
                    >
                        <Paper className={classes.paper}>

                            <MyAuctionsTable

                                order={order}
                                orderBy={orderBy}
                                pageSize={pageSize}
                                currPage={currPage}

                                auctions={auctions}
                                // totalPages={totalPages}
                                totalAuctions={totalAuctions}
                                isLoading={isLoading}

                                startAuction={this.startAuction}
                                deleteAuction={this.deleteAuction}
                                handleRequestSort={this.handleRequestSort}
                                handleChangePage={this.handleChangePage}
                                handleChangeRowsPerPage={this.handleChangeRowsPerPage}

                            />

                            <Grid
                                container
                                justify="flex-end"
                            >
                                <Link to="/myauctions/create-auction">
                                    <Button
                                        className={classes.auctionButton}
                                        color="primary"
                                        //onClick={handleSubmit}
                                        size="large"
                                        variant="contained"
                                    >
                                        Create Auction
                                            </Button>
                                </Link>
                            </Grid>

                        </Paper>
                    </Grid>

                </Grid>
            </div>
        );

    }
}

const styledMyAuctions = withStyles(styles)(MyAuctions);
export default styledMyAuctions;