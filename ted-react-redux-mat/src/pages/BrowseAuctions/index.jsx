import React, { Component } from 'react';

import { Grid, Paper, IconButton, FormControlLabel, Switch, Collapse } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core';
import { pageStyles } from '../pageStyles';

import { auctionsApi } from '../../services';
import { auctionActions } from '../../store/ducks';

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
    filterPaper: {
        width: '100%',
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        marginBottom: theme.spacing(2),
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
        marginTop: theme.spacing(12),
        marginRight: theme.spacing(10),
    },
    rightWrapper: {
        marginTop: theme.spacing(12),
        marginRight: theme.spacing(4),
    },
    container: {
        marginBottom: theme.spacing(1),
    },
    recommendationPaper: {
        width: '100%',
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(3),
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(1),
    }
});


class BrowseAuctions extends Component {

    state = {
        // categoryFields: [{
        //     selectedIndex: '',
        //     selectedValue: '',
        //     allCategories: [],
        // }],

        // pageSizeOptions are [10, 20, 50]

        //order: 'asc',
        //orderBy: '',

        //totalPages: null,

        recoAuctions: [],
        isRecoLoading: true,
    };

    componentDidMount() {
        this.loadRecommendedAuctions();

        const { dispatch } = this.props;
        dispatch(auctionsApi.getRootCategoriesThunk());
    }

    refreshAuctions = () => {
        const { categoryFields, description, lowestPrice, highestPrice,
            location, order, orderBy, currPage, pageSize, dispatch } = this.props;

        dispatch(auctionsApi.getAllAuctionsThunk(categoryFields, description, lowestPrice, highestPrice, 
            location, order, orderBy, currPage, pageSize));
    }


    loadRecommendedAuctions = () => {
        //this.setState((prevState, props) => { return { isRecoLoading: true } });

        auctionsApi.getRecommendedAuctions()
            .then(data => {
                if (data) {
                    this.setState((prevState, props) => {
                        return {
                            recoAuctions: data,
                            isRecoLoading: false,
                        }
                    });
                }
            });
    }

    handleCategoryPick = (e, level) => {
        // Value is the category's index in the level's all categories
        const catIndex = e.target.value;
        const { categoryFields, description, lowestPrice, highestPrice,
            location, order, orderBy, currPage, pageSize, dispatch } = this.props;

        dispatch(auctionsApi.pickCategoryThunk(catIndex, level, categoryFields, description, lowestPrice, highestPrice, location, order, orderBy, currPage, pageSize));
    }

    deleteCategory = () => {
        const { categoryFields, description, lowestPrice, highestPrice,
            location, order, orderBy, currPage, pageSize, dispatch } = this.props;

        dispatch(auctionsApi.deleteCategoryThunk(categoryFields, description, lowestPrice, highestPrice, location, order, orderBy, currPage, pageSize));
    }

    changeFilterVisibility = () => {
        const { dispatch, showFilters } = this.props;
        if (showFilters) {
            dispatch(auctionActions.removeFilters());
        }
        else {
            dispatch(auctionActions.addFilters());
        }
        
    }

    handleChangePage = (event, newPage) => {
        const { categoryFields, description, lowestPrice, highestPrice,
            location, order, orderBy, pageSize, dispatch } = this.props;

        dispatch(auctionsApi.changePageThunk(categoryFields, description, lowestPrice, highestPrice,
            location, order, orderBy, newPage, pageSize));
    }

    handleChangeItemsPerPage = (event) => {
        const { categoryFields, description, lowestPrice, highestPrice,
            location, order, orderBy, dispatch } = this.props;
        const newPageSize = +event.target.value;

        dispatch(auctionsApi.changePageSizeThunk(categoryFields, description, lowestPrice, highestPrice,
            location, order, orderBy, newPageSize));
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        const { dispatch } = this.props;
        dispatch(auctionActions.updateFilters({ [name]: value }));
    }

    render() {
        const { isRecoLoading, recoAuctions } = this.state;

        const { categoryFields, auctions, totalAuctions, isLoading, showFilters, lowestPrice,
            order, orderBy, highestPrice, location, description, pageSize, currPage } = this.props;

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
                        className={classes.rightWrapper}
                        item
                        lg={11}
                    >
                        <Paper className={classes.titlePaper}>
                            <PaperTitle
                                className={classes.bareTitle}
                                title='Browse Auctions'
                                suggestion={''}
                            />
                            {/* <FilterListIcon onClick={this.changeFilterVisibility} /> */}

                            <FormControlLabel
                                control={<Switch checked={showFilters} color="primary" onChange={this.changeFilterVisibility} />}
                                label="Show Filters"
                            />
                            <div className={classes.container}>
                                <Collapse in={showFilters}>
                                    <AuctionFilters
                                        description={description}
                                        lowestPrice={lowestPrice}
                                        highestPrice={highestPrice}
                                        location={location}
                                        order={order}
                                        orderBy={orderBy}

                                        handleChange={this.handleChange}
                                        refreshAuctions={this.refreshAuctions}
                                    />

                                    <CategoryList
                                        categoryFields={categoryFields}
                                        handleCategoryPick={this.handleCategoryPick}
                                        deleteCategory={this.deleteCategory}
                                    />
                                </Collapse>
                            </div>
                        </Paper>

                        {isLoading ? '' : (
                            <AuctionCardTable
                                auctions={auctions}
                                withPagination

                                pageSize={pageSize}
                                currPage={currPage}
                                //totalPages={totalPages}
                                totalAuctions={totalAuctions}
                                isLoading={isLoading}

                                handleChangePage={this.handleChangePage}
                                handleChangeItemsPerPage={this.handleChangeItemsPerPage}
                            />
                        )}


                        <Paper className={classes.recommendationPaper}>
                            <PaperTitle
                                className={classes.bareTitle}
                                title='You Might Also Like'
                                suggestion={''}
                            />
                        </Paper>

                        {isRecoLoading ? '' : (
                            <AuctionCardTable
                                isLoading={isRecoLoading}
                                auctions={recoAuctions}
                            />
                        )}


                    </Grid>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { auctionStore } = state;
    const {
        categoryFields,

        auctions, 
        totalAuctions, 
        isLoading,

        showFilters,
        description,
        lowestPrice, 
        highestPrice, 
        location,
        order,
        orderBy,

        pageSize, 
        currPage,

    } = auctionStore;
    return {
        categoryFields,

        auctions, 
        totalAuctions,
        isLoading,

        showFilters,
        description,
        lowestPrice, 
        highestPrice, 
        location,
        order, 
        orderBy,

        pageSize, 
        currPage,
        
    };
}

const connectedBrowseAuctions = connect(mapStateToProps)(BrowseAuctions);
const styledBrowseAuctions = withStyles(styles)(connectedBrowseAuctions);
export default styledBrowseAuctions;



