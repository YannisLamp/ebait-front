import React, { Component } from 'react';
import { history } from '../../../utils';

import { Grid, Paper, Button, TextField, CircularProgress } from '@material-ui/core';

import { connect } from 'react-redux';
import { format } from 'date-fns';

import produce from "immer";

import { withStyles } from '@material-ui/core/styles';
import { pageStyles } from '../../pageStyles';

import AuctionDetailsForm from '../AuctionDetailsForm';
import AuctionMap from '../AuctionMap';
import AuctionPhotoUpload from '../AuctionPhotoUpload';

import { nominatimApi } from '../../../services';
import { auctionsApi } from '../../../services';


const styles = theme => ({
    ...pageStyles(theme),
    paper: {
        width: '100%',
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        minHeight: '80vh',

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    buttonWrapper: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(14),
    },
    button: {
        marginTop: theme.spacing(1),
        // paddingLeft: theme.spacing(3),
        // paddingRight: theme.spacing(3),
        marginBottom: theme.spacing(1),
    },
    buttonPaper: {
        width: '100%',
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8),
        marginBottom: theme.spacing(4),
    },
    locationWrapper: {
        marginTop: theme.spacing(12),
        marginRight: theme.spacing(10),
    },
    detailsWrapper: {
        marginTop: theme.spacing(12),
        marginRight: theme.spacing(10),
    },
    rightWrapper: {
        marginTop: theme.spacing(12),
        marginRight: theme.spacing(4),
    },
    progressButtons: {
        display: 'inline-flex',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(4),
        justifyContent: 'flex-end',
    },
    buttonMargin: {
        marginRight: theme.spacing(3),
    },
    circularProgress: {
        //display: 'block',
        marginRight: theme.spacing(3),
    },
});

class CreateAuction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            ends: null,
            firstBid: '',
            buyout: '',
            categoryFields: [{
                selectedIndex: '',
                selectedValue: '',
                allCategories: [],
            }],

            photos: [],
            shownPhoto: '',


            country: this.props.user.country,
            locationDescription: this.props.user.address,

            locationQuery: this.props.user.address + ', ' + this.props.user.country,
            startingLat: null,
            startingLng: null,
            selectedLat: null,
            selectedLng: null,
            hasLocation: false,

            isLoading: false,
            currentStep: 1,
        };

        this.handleDateChange = this.handleDateChange.bind(this);

        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleCategoryPick = this.handleCategoryPick.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.redirectToMyAuctions = this.redirectToMyAuctions.bind(this);
        this.onPhotoAddition = this.onPhotoAddition.bind(this);
        this.selectShownPhoto = this.selectShownPhoto.bind(this);
        this.onPhotoDelete = this.onPhotoDelete.bind(this);

        this.updateMap = this.updateMap.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.prevStep = this.prevStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }


    componentDidMount() {

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

        this.updateMap();
    }


    handleChange(e) {
        const { name, value } = e.target;
        this.setState((prevState, props) => { return { [name]: value } });
    }

    handleDateChange(date) {
        this.setState((prevState, props) => { return { ends: date } });
    }

    handleCountryChange(e) {
        const { value } = e.target;
        this.setState((prevState, props) => {
            const query = prevState.locationDescription + ', ' + value;
            return {
                country: value,
                locationQuery: query
            }
        });
    }

    handleLocationChange(e) {
        const { value } = e.target;
        this.setState((prevState, props) => {
            const query = value + ', ' + prevState.country;
            return {
                locationDescription: value,
                locationQuery: query
            }
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
                    return produce(prevState, draft => {
                        // Change current field value
                        draft.categoryFields[cat.level].selectedIndex = catIndex;
                        draft.categoryFields[cat.level].selectedValue = cat.name;

                        if (data.length > 0) {
                            // We want an extra object to be in the list 
                            draft.categoryFields.splice(cat.level + 2);
                            draft.categoryFields[cat.level + 1] = {
                                selectedIndex: '',
                                selectedValue: '',
                                allCategories: data,
                            }
                        }
                        else {
                            draft.categoryFields.splice(cat.level + 1);
                        }
                    });
                });
            });
    }

    deleteCategory() {
        this.setState((prevState, props) => {
            return produce(prevState, draft => {
                if (draft.categoryFields.length === 1) {
                    draft.categoryFields[0].selectedIndex = '';
                    draft.categoryFields[0].selectedValue = '';
                }
                else {
                    draft.categoryFields.pop();
                }
            });
        });
    }

    updateMap() {
        const query = this.state.locationQuery;
        nominatimApi.getGeoLocation(query)
            .then(data => {
                if (data && data.features.length > 0) {
                    const coords = data.features[0].geometry.coordinates;
                    // Coordinates are given in reverse order from API
                    this.setState((prevState, props) => {
                        return {
                            startingLat: coords[1],
                            startingLng: coords[0]
                        }
                    });
                }
                // else {
                //     this.setState((prevState, props) => {
                //         return {
                //             startingLat: 0,
                //             startingLng: 0
                //         }
                //     });
                // }
            });
    }

    handleMapClick(e) {
        this.setState((prevState, props) => {
            return {
                selectedLat: e.latlng.lat,
                selectedLng: e.latlng.lng,
                hasLocation: true,
            }
        });
    }

    onPhotoAddition(event) {
        event.persist();
        console.log(event);
        this.setState((prevState, props) => {
            return produce(prevState, draft => {
                for (const photo of event.target.files) {
                    draft.photos.push(photo);
                }

                draft.shownPhoto = draft.photos.length - 1;
            });
        });
    }

    selectShownPhoto(index) {
        this.setState((prevState, props) => { return { shownPhoto: index } });
    }

    onPhotoDelete(index) {
        this.setState((prevState, props) => {
            return produce(prevState, draft => {
                draft.photos.splice(index, 1);

                // Don't let the shown photo index become -1
                draft.shownPhoto = draft.shownPhoto - 1;
                if (draft.shownPhoto < 0) {
                    draft.shownPhoto = 0
                }
            });
        });
    }

    redirectToMyAuctions() {
        history.push('/myauctions');
    }

    handleSubmit(e) {
        e.preventDefault();
        const { name, description, ends, firstBid, buyout, categoryFields,
            country, locationDescription, selectedLat, selectedLng, photos } = this.state;

        // Convert category fields to categories for API
        let categories = [];
        for (let cat of categoryFields) {
            if (cat.selectedValue != "") {
                categories.push({ name: cat.selectedValue });
            }
        }

        // Convert Date object to proper format
        const convertedends = format(ends, 'MMM-dd-yy HH:mm:ss');

        this.setState((prevState, props) => { return { isLoading: true, } });
        auctionsApi.createAuction(name, description, convertedends,
            firstBid, buyout, categories, country, locationDescription,
            selectedLat, selectedLng, photos)
            .then(data => {
                this.setState((prevState, props) => { return { isLoading: false, } });
                this.redirectToMyAuctions();
            });
    }


    prevStep() {
        this.setState((prevState, props) => {
            return { 'currentStep': prevState.currentStep - 1 }
        });
    }

    nextStep() {
        this.setState((prevState, props) => {
            return { 'currentStep': prevState.currentStep + 1 }
        });
    }

    render() {
        const { name, description, ends, firstBid, buyout, isLoading, categoryFields, photos, shownPhoto } = this.state;

        const { currentStep, country, locationDescription, locationQuery,
            startingLat, startingLng, selectedLat, selectedLng, hasLocation } = this.state;


        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid
                    className={classes.grid}
                    container
                    justify="center"
                >

                    {currentStep === 2 ? (
                        <>
                            {/* <Grid
                                    className={classes.locationWrapper}
                                    item
                                    lg={3}
                                >
                                    <Paper className={classes.paper}>
                                        <AuctionLocationForm
                                            country={country}
                                            locationDescription={locationDescription}

                                            handleCountryChange={this.handleCountryChange}
                                            handleChange={this.handleChange}
                                            updateMap={this.updateMap}
                                        />

                                    </Paper>
                                </Grid> */}

                            <Grid
                                className={classes.rightWrapper}
                                item
                                lg={10}
                            >
                                <Paper className={classes.paper}>
                                    <AuctionMap
                                        country={country}
                                        locationDescription={locationDescription}
                                        locationQuery={locationQuery}
                                        startingLat={startingLat}
                                        startingLng={startingLng}
                                        selectedLat={selectedLat}
                                        selectedLng={selectedLng}
                                        hasLocation={hasLocation}

                                        handleCountryChange={this.handleCountryChange}
                                        handleLocationChange={this.handleLocationChange}
                                        handleChange={this.handleChange}
                                        handleMapClick={this.handleMapClick}
                                        updateMap={this.updateMap}
                                    />


                                    <div className={classes.progressButtons}>
                                        <Button
                                            className={classes.buttonMargin}
                                            onClick={this.prevStep}
                                            size="large"
                                            variant="contained"
                                        >
                                            Back
                                            </Button>

                                        {isLoading ? (
                                            <CircularProgress className={classes.circularProgress} />
                                        ) : (
                                                <Button
                                                    color="primary"
                                                    onClick={this.handleSubmit}
                                                    size="large"
                                                    variant="contained"
                                                >
                                                    Create
                                                    </Button>
                                            )
                                        }
                                    </div>
                                </Paper>
                            </Grid>
                        </>
                    ) : (

                            <>

                                <Grid
                                    className={classes.detailsWrapper}
                                    item
                                    lg={5}
                                >
                                    <Paper className={classes.paper}>
                                        <AuctionDetailsForm
                                            name={name}
                                            description={description}
                                            ends={ends}
                                            firstBid={firstBid}
                                            buyout={buyout}
                                            categoryFields={categoryFields}

                                            handleChange={this.handleChange}
                                            handleDateChange={this.handleDateChange}
                                            handleCategoryPick={this.handleCategoryPick}
                                            deleteCategory={this.deleteCategory}
                                        />

                                    </Paper>
                                </Grid>

                                <Grid
                                    className={classes.rightWrapper}
                                    item
                                    lg={5}
                                >
                                    <Paper className={classes.paper}>
                                        <AuctionPhotoUpload
                                            photos={photos}
                                            shownPhoto={shownPhoto}

                                            onPhotoAddition={this.onPhotoAddition}
                                            selectShownPhoto={this.selectShownPhoto}
                                            onPhotoDelete={this.onPhotoDelete}

                                        />

                                        <div className={classes.progressButtons}>
                                            <Button
                                                className={classes.buttonMargin}
                                                style={{ color: 'white', backgroundColor: 'rgb(220, 0, 78)' }}
                                                onClick={this.redirectToMyAuctions}
                                                size="large"
                                                variant="contained"
                                            >
                                                Cancel
                                                </Button>

                                            <Button
                                                onClick={this.nextStep}
                                                size="large"
                                                variant="contained"
                                            >
                                                Next
                                                </Button>
                                        </div>
                                    </Paper>
                                </Grid>

                            </>

                        )}

                </Grid>
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { userStore } = state;
    const { user } = userStore;
    return {
        user
    };
}

const connectedCreateAuction = connect(mapStateToProps)(CreateAuction);
const styledCreateAuction = withStyles(styles)(connectedCreateAuction);
export default styledCreateAuction;




