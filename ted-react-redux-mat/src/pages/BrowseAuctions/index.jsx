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
        categoryFields: [{
            selectedIndex: '',
            selectedValue: '',
            allCategories: [],
        }],

        //auctions: [],

        //showFilters: false,
        //description: '',
        // lowestPrice: null,
        // highestPrice: null,
        // location: '',

        pageSize: 5,
        currPage: 0,

        order: 'asc',
        orderBy: '',

        //totalPages: null,
        //totalAuctions: null,
        //isLoading: true,

        recoAuctions: [],
        isRecoLoading: true,
    };

    componentDidMount() {
        // const { categoryFields, description, lowestPrice, highestPrice,
        //     location, order, orderBy, currPage, pageSize } = this.state;

        //this.loadAuctions(categoryFields, description, lowestPrice, highestPrice,
        //    location, order, orderBy, currPage, pageSize);

        this.loadRecommendedAuctions();

        auctionsApi.getRootCategories()
            .then(data => {
                if (data) {
                    this.setState((prevState, props) => {
                        return {
                            categoryFields: [{
                                selectedIndex: prevState.categoryFields[0].selectedIndex,
                                selectedValue: prevState.categoryFields[0].selectedValue,
                                allCategories: data,
                            }],
                        }
                    });
                }
            });
    }

    refreshAuctions = () => {
        const { categoryFields, lowestPrice, highestPrice,
            location, order, orderBy, currPage, pageSize } = this.state;

        const { description } = this.props;

        this.loadAuctions(categoryFields, description, lowestPrice, highestPrice,
            location, order, orderBy, currPage, pageSize);
    }

    // loadAuctions = (categoryFields, description, lowestPrice, highestPrice, location, order, orderBy, currPage, pageSize) => {

    //     this.setState((prevState, props) => { return { isLoading: true } });

    //     let categories = []
    //     for (const category of categoryFields.slice(0, categoryFields.length - 1)) {
    //         categories.push(category.selectedValue);
    //     }

    //     auctionsApi.getAllAuctions(categories, description, lowestPrice, highestPrice, location,
    //         order, orderBy, currPage, pageSize)
    //         .then(data => {
    //             if (data) {
    //                 this.setState((prevState, props) => {
    //                     return {
    //                         auctions: data.auctions,
    //                         totalAuctions: data.totalFilteredAuctions,
    //                         isLoading: false,
    //                     }
    //                 });
    //             }
    //         });
    // }

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
        const cat = this.state.categoryFields[level].allCategories[catIndex];
        // Get the categories of the next level
        auctionsApi.getChildrenCategories(cat.id)
            .then(data => {
                if (data) {
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

                        const { description, lowestPrice, highestPrice,
                            location, order, orderBy, currPage, pageSize } = prevState;
                        this.loadAuctions(prevCategories, description, lowestPrice, highestPrice,
                            location, order, orderBy, currPage, pageSize);

                        return {
                            prevCategories,
                        }
                    });
                }
            });
    }

    deleteCategory = () => {
        this.setState((prevState, props) => {
            let prevCategories = prevState.categoryFields;

            if (prevCategories.length === 1) {
                prevCategories[0].selectedIndex = '';
                prevCategories[0].selectedValue = '';
            }
            else {
                prevCategories.pop();
            }

            return {
                categoryFields: prevCategories
            }
        });
    }

    changeFilterVisibility = () => {
        //this.setState((prevState, props) => { return { showFilters: !prevState.showFilters } });
        const { dispatch } = this.props;
        dispatch(auctionActions.toggleFilters());

    }

    handleChangePage = (event, newPage) => {
        this.setState((prevState, props) => {
            const { categoryFields, description, lowestPrice, highestPrice,
                location, order, orderBy, pageSize } = prevState;

            this.loadAuctions(categoryFields, description, lowestPrice, highestPrice,
                location, order, orderBy, newPage, pageSize);
            return {
                currPage: newPage
            }
        });
    }

    handleChangeItemsPerPage = (event) => {
        this.setState((prevState, props) => {
            const { categoryFields, description, lowestPrice, highestPrice,
                location, order, orderBy } = prevState;
            const newPageSize = +event.target.value;

            this.loadAuctions(categoryFields, description, lowestPrice, highestPrice,
                location, order, orderBy, 0, newPageSize);
            return {
                currPage: 0,
                pageSize: newPageSize,
            }
        });

    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState, props) => { return { [name]: value } });
    }

    render() {

        const {  pageSize, currPage,
             categoryFields, lowestPrice,
            highestPrice, location, isRecoLoading, recoAuctions } = this.state;

        const { auctions, totalAuctions, isLoading, 
            showFilters, description } = this.props;
        console.log('auctions props');
        console.log(auctions);

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

                                        handleChange={this.handleChange}
                                        refreshAuctions={this.refreshAuctions}
                                    />

                                    <CategoryList
                                        categoryFields={categoryFields}
                                        handleCategoryPick={this.handleCategoryPick}
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
                                title='You Also Might Like'
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
    const { auctions, totalFilteredAuctions, isLoading, 
        showFilters,
        description } = auctionStore;
    return {
        auctions, 
        totalFilteredAuctions,
        isLoading,

        showFilters,
        description,
    };
}

const connectedBrowseAuctions = connect(mapStateToProps)(BrowseAuctions);
const styledBrowseAuctions = withStyles(styles)(connectedBrowseAuctions);
export default styledBrowseAuctions;



