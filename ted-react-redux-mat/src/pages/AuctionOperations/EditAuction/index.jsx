import React, { Component } from 'react';
import { history } from '../../../utils';
// Material
import { Grid, Paper, Button, CircularProgress } from '@material-ui/core';

import { connect } from 'react-redux';
import { format, parse } from 'date-fns';

import { alertActions } from '../../../store/ducks/alertStore';

import produce from "immer";

// For importing my custom styles  
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
        width: '100%',
        display: 'inline-flex',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(4),
        justifyContent: 'flex-end',
    },
    buttonMargin: {
        marginRight: theme.spacing(3),
    },
    circularProgress: {
        marginRight: theme.spacing(3),
    },
});

class EditAuction extends Component {

    constructor(props) {
        super(props);

        const auction = this.props.location.state.auction;
        const { categories } = auction;
        let emptyFields = [];
        for (const category of categories) {
            emptyFields.push({
                selectedIndex: '',
                selectedValue: category.name,
                allCategories: [],
            })
        }
        // One last push for the empty field
        emptyFields.push({
            selectedIndex: '',
            selectedValue: '',
            allCategories: [],
        })

        this.state = {
            itemID: auction.itemID ? auction.itemID : '',
            name: auction.name ? auction.name : '',
            description: auction.description ? auction.description : '',
            ends: auction.ends ? parse(auction.ends, 'MMM-dd-yy HH:mm:ss', new Date()) : null,
            firstBid: auction.firstBid ? auction.firstBid : '',
            buyout: auction.buyPrice ? auction.buyPrice : '',

            categoryFields: emptyFields,

            photos: auction.photos ? auction.photos : [],
            deletedPhotos: [],
            shownPhoto: auction.photos ? 0 : '',

            country: auction.country ? auction.country : '',
            locationDescription: auction.location.text ? auction.location.text : '',

            locationQuery: auction.location.text ? auction.location.text : '',
            startingLat: auction.location.latitude ? auction.location.latitude : '',
            startingLng: auction.location.longitude ? auction.location.longitude : '',
            selectedLat: auction.location.latitude ? auction.location.latitude : '',
            selectedLng: auction.location.longitude ? auction.location.longitude : '',
            hasLocation: auction.location.latitude && auction.location.longitude ? true : false,

            isLoading: false,
            currentStep: 1,
        };

        this.setInitCategoryState = this.setInitCategoryState.bind(this);
        this.setInitLocationState = this.setInitLocationState.bind(this);

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


    setInitCategoryState() {
        function findCategoryIndex(data, searchCategory) {
            for (const [index, inCategory] of data.entries()) {
                if (inCategory.name === searchCategory)
                    return index;
            }
            return -1;
        }

        // We have to fetch the allCategories for each field level (category)
        // auctionsApi.getRootCategories()
        let axiosReqs = [auctionsApi.getRootCategories()];
        for (const category of this.props.location.state.auction.categories) {
            axiosReqs.push(auctionsApi.getChildrenCategories(category.id))
        }

        auctionsApi.getAllCats(axiosReqs)
            .then(allResp => {
                // Once we get all responses
                this.setState((prevState, props) => {
                    return produce(prevState, draft => {

                        for (let index = 0; index < draft.categoryFields.length; index++) {
                            if (draft.categoryFields[index].selectedValue === '') {
                                draft.categoryFields[index] = {
                                    selectedIndex: '',
                                    selectedValue: '',
                                    allCategories: allResp[index],
                                }
                            }
                            else {
                                draft.categoryFields[index] = {
                                    selectedIndex: findCategoryIndex(allResp[index], draft.categoryFields[index].selectedValue),
                                    selectedValue: draft.categoryFields[index].selectedValue,
                                    allCategories: allResp[index],
                                }
                            }
                        }
                    });
                });
            });
    }


    setInitLocationState() {
        nominatimApi.getGeoLocation(this.state.locationDescription)
            .then(data => {
                const coords = data.features[0].geometry.coordinates;
                // Coordinates are given in reverse order from API
                this.setState((prevState, props) => {
                    return {
                        startingLat: coords[1],
                        startingLng: coords[0]
                    }
                });
            })
    }


    componentDidMount() {
        // Set initial category state from given auction
        this.setInitCategoryState();

        // Set initial location state from given auction if there is no previous location picked
        if (!this.state.hasLocation) {
            this.setInitLocationState();
        }
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
            const { photos } = prevState;
            for (const photo of event.target.files) {
                photos.push(photo);
            }
            return {
                photos: photos,
                shownPhoto: photos.length - 1,
            }
        });
    }

    selectShownPhoto(index) {
        this.setState((prevState, props) => { return { shownPhoto: index } });
    }

    onPhotoDelete(index) {
        this.setState((prevState, props) => {
            const { photos, deletedPhotos, shownPhoto } = prevState;

            // If deleted photo has been uploaded (has an id)
            // then it must be deleted by request
            if (photos[index].photoId) {
                deletedPhotos.push(photos[index]);
            }

            photos.splice(index, 1);
            // Don't let the shown photo index become -1
            let newShownPhoto = shownPhoto - 1;
            if (newShownPhoto < 0) {
                newShownPhoto = 0
            }

            return {
                photos: photos,
                deletedPhotos: deletedPhotos,
                shownPhoto: newShownPhoto,
            }
        });
    }

    redirectToMyAuctions() {
        history.push('/myauctions');
    }

    handleSubmit(e) {
        e.preventDefault();
        const { itemID, name, description, ends, firstBid, buyout, categoryFields,
            country, locationDescription, selectedLat, selectedLng, photos, deletedPhotos } = this.state;

        // Convert category fields to categories for API
        let categories = [];
        for (let cat of categoryFields) {
            if (cat.selectedValue !== "") {
                categories.push({ name: cat.selectedValue });
            }
        }

        // Convert Date object to proper format
        const convertedends = format(ends, 'MMM-dd-yy HH:mm:ss');

        // Remove any photos that have been uploaded from photos
        const onlyNewPhotos = photos.filter((value, index, arr) => {
            return !value.photoId;
        });

        if (name !== "" && convertedends && firstBid !== "") {
            this.setState((prevState, props) => { return { isLoading: true, } });
            auctionsApi.editAuction(itemID, name, description, convertedends,
                firstBid, buyout, categories, country, locationDescription,
                selectedLat, selectedLng, onlyNewPhotos, deletedPhotos)
                .then(data => {
                    this.setState((prevState, props) => { return { isLoading: false, } });
                    this.redirectToMyAuctions();
                });
        }
        else {
            const { dispatch } = this.props; 
            dispatch(alertActions("Auction details missing, name, ending date, first bid are required"));
            this.setState((prevState, props) => { return { isLoading: false, } });
        }
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
                                                    Edit Auction
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

const connectedEditAuction = connect(mapStateToProps)(EditAuction);
const styledEditAuction = withStyles(styles)(connectedEditAuction);
export default styledEditAuction;