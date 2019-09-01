import React, { Component } from 'react';

// Material
import { Grid, Paper, IconButton } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

// For importing my custom styles  
import { withStyles } from '@material-ui/core';
import { pageStyles } from '../pageStyles';

import Sidebar from '../../sharedComp/Sidebar';

import { auctionsApi } from '../../services';

import PaperTitle from '../../sharedComp/PaperTitle';

import AuctionFilters from './AuctionFilters';
import AuctionCardTable from './AuctionCardTable';
import CategoryList from '../../sharedComp/CategoryList';

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
    titlePaper: {
        width: '100%',
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    bareTitle: {
        paddingTop: theme.spacing(3),
    },
    filterWrapper: {
        marginTop: theme.spacing(14),
        marginRight: theme.spacing(10),
    },
});


class BrowseAuctions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categoryFields: [{
                selectedIndex: '',
                selectedValue: '',
                allCategories: [],
            }],

            auctions: [],
            showFilters: false,

            pageSize: 10,
            currPage: 0,

            totalPages: null,
            totalAuctions: null,
            isLoading: false,
        };

        this.loadAuctions = this.loadAuctions.bind(this);
        this.handleCategoryPick = this.handleCategoryPick.bind(this);
        this.changeFilterVisibility = this.changeFilterVisibility.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeItemsPerPage = this.handleChangeItemsPerPage.bind(this);
    }

    componentDidMount() {
        this.loadAuctions();

        auctionsApi.getRootCategories()
            .then(data => {
                this.setState((prevState, props) => {
                    return {
                        categoryFields: [{
                            selectedIndex: prevState.categoryFields[0].selectedIndex,
                            selectedValue: prevState.categoryFields[0].selectedValue,
                            allCategories: data,
                        }],
                    }
                });
            });
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

    handleCategoryPick(e, level) {
        // Value is the category's index in the level's all categories
        const catIndex = e.target.value;
        const cat = this.state.categoryFields[level].allCategories[catIndex];
        // Get the categories of the next level
        auctionsApi.getChildrenCategories(cat.id)
            .then(data => {
                this.setState((prevState, props) => {
                    let prevCategories = prevState.categoryFields;

                    // Change current field value
                    prevCategories[cat.level].selectedIndex = catIndex;
                    prevCategories[cat.level].selectedValue = cat.name;

                    if (data.length > 0) {
                        // We want an extra object to be in the list 
                        prevCategories.splice(cat.level + 2);
                        prevCategories[cat.level + 1] = {
                            selectedIndex: '',
                            selectedValue: '',
                            allCategories: data,
                        }
                    }
                    else {
                        prevCategories.splice(cat.level + 1);
                    }

                    return {
                        prevCategories,
                    }
                });
            });
    }

    changeFilterVisibility() {
        this.setState((prevState, props) => { return { showFilters: !prevState.showFilters } });
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

    handleChangeItemsPerPage(event) {
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

        const { auctions, showFilters, pageSize, currPage, totalPages,
            totalAuctions, isLoading, categoryFields } = this.state;

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
                        

                        { showFilters ? (
                            <>
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
                                {/* <Paper className={classes.titlePaper}> */}
                                    <PaperTitle
                                        className={classes.bareTitle}
                                        title='Browse Auctions'
                                        suggestion={''}
                                    />
                                    <IconButton  onClick={this.changeFilterVisibility}><FilterListIcon /> </IconButton>

                                    <CategoryList 
                                        categoryFields={categoryFields}
                                        handleCategoryPick={this.handleCategoryPick}
                                    />

                                {/* </Paper> */}

                                <AuctionCardTable
                                    auctions={auctions}

                                    pageSize={pageSize}
                                    currPage={currPage}

                                    totalPages={totalPages}
                                    totalAuctions={totalAuctions}
                                    isLoading={isLoading}

                                    changeUser={this.changeUser}
                                    handleRequestSort={this.handleRequestSort}
                                    handleChangePage={this.handleChangePage}
                                    handleChangeItemsPerPage={this.handleChangeItemsPerPage}
                                />
                                {/* </Paper> */}
                            </Grid>
                            </>
                        ) : (
                            <Grid
                                className={classes.rightWrapper}
                                item
                                lg={10}
                            >
                                {/* <Paper className={classes.titlePaper}> */}
                                    <PaperTitle
                                        className={classes.bareTitle}
                                        title='Browse Auctions'
                                        suggestion={''}
                                    />
                                    <FilterListIcon onClick={this.changeFilterVisibility} />

                                    <CategoryList 
                                        categoryFields={categoryFields}
                                        handleCategoryPick={this.handleCategoryPick}
                                    />

                                {/* </Paper> */}

                                <AuctionCardTable
                                    auctions={auctions}

                                    pageSize={pageSize}
                                    currPage={currPage}

                                    totalPages={totalPages}
                                    totalAuctions={totalAuctions}
                                    isLoading={isLoading}

                                    changeUser={this.changeUser}
                                    handleRequestSort={this.handleRequestSort}
                                    handleChangePage={this.handleChangePage}
                                    handleChangeItemsPerPage={this.handleChangeItemsPerPage}
                                />
                                {/* </Paper> */}
                            </Grid>
                        )}



                    </Grid>
                </div>
            </Sidebar>
        );
    }
}

const styledBrowseAuctions = withStyles(styles)(BrowseAuctions);
export default styledBrowseAuctions;