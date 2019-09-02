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
        marginTop: theme.spacing(14),
        marginRight: theme.spacing(4),
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
            description: '',
            lowestPrice: null,
            highestPrice: null,
            location: '',

            pageSize: 5,
            currPage: 0,

            order: 'asc',
            orderBy: '',

            //totalPages: null,
            totalAuctions: null,
            isLoading: false,
        };

        this.loadAuctions = this.loadAuctions.bind(this);
        this.refreshAuctions = this.refreshAuctions.bind(this);
        this.handleCategoryPick = this.handleCategoryPick.bind(this);
        this.changeFilterVisibility = this.changeFilterVisibility.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeItemsPerPage = this.handleChangeItemsPerPage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { categoryFields, description, lowestPrice, highestPrice,
            location, order, orderBy, currPage, pageSize } = this.state;

        this.loadAuctions(categoryFields, description, lowestPrice, highestPrice,
            location, order, orderBy, currPage, pageSize);

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

    refreshAuctions() {
        const { categoryFields, description, lowestPrice, highestPrice,
            location, order, orderBy, currPage, pageSize } = this.state;

        this.loadAuctions(categoryFields, description, lowestPrice, highestPrice,
            location, order, orderBy, currPage, pageSize);
    }

    loadAuctions(categoryFields, description, lowestPrice, highestPrice,
        location, order, orderBy, currPage, pageSize) {

        let categories = []
        for (const category of categoryFields.slice(0, categoryFields.length - 1)) {
            categories.push(category.selectedValue);
        }

        auctionsApi.getAllAuctions(categories, description, lowestPrice, highestPrice, location,
            order, orderBy, currPage, pageSize)
            .then(data => {
                console.log(data);
                this.setState((prevState, props) => {
                    return {
                        auctions: data.auctions,
                        totalAuctions: data.totalFilteredAuctions,
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

    deleteCategory() {
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

    changeFilterVisibility() {
        this.setState((prevState, props) => { return { showFilters: !prevState.showFilters } });
    }

    handleChangePage(event, newPage) {
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

    handleChangeItemsPerPage(event) {
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

    handleChange(e) {
        const { name, value } = e.target;
        this.setState((prevState, props) => { return { [name]: value } });
    }

    render() {

        const { auctions, showFilters, pageSize, currPage,
            totalAuctions, isLoading, categoryFields, description, lowestPrice,
            highestPrice, location, } = this.state;

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

                            {showFilters ? (
                                <>
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
                                </>
                            ) : ''}

                            {/* </Paper> */}

                            <AuctionCardTable
                                auctions={auctions}

                                pageSize={pageSize}
                                currPage={currPage}

                                //totalPages={totalPages}
                                totalAuctions={totalAuctions}
                                isLoading={isLoading}

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