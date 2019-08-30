import React, { Component } from 'react';
import { history } from '../../utils';
// Material
import { Grid, Paper, Button, TextField, CircularProgress } from '@material-ui/core';

import { connect } from 'react-redux';
import { format } from 'date-fns';

// For importing my custom styles  
import { withStyles } from '@material-ui/core/styles';
import { pageStyles } from '../pageStyles';

import Sidebar from '../../sharedComp/Sidebar';
import AuctionLocationForm from './AuctionLocationForm';
import AuctionDetailsForm from './AuctionDetailsForm';
import CreateAuctionMap from './CreateAuctionMap';
import AuctionPhotoUpload from './AuctionPhotoUpload';
import CreateAuctionProgress from './CreateAuctionProgress';

import { nominatimApi } from '../../services';
import { auctionsApi } from '../../services';


const styles = theme => ({
    ...pageStyles(theme),
    paper: {
        width: '100%',
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingBottom: theme.spacing(1),
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
        marginTop: theme.spacing(14),
        marginRight: theme.spacing(10),
    },
    detailsWrapper: {
        marginTop: theme.spacing(14),
        marginRight: theme.spacing(10),
    },
    progressButtons: {
        width: '100%',
        display: 'inline-flex',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        justifyContent: 'space-between',
    },
    circularProgress: {
        //display: 'block',
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(4),
    },
});

class CreateAuction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            endingDate: null,
            firstBid: '',
            buyout: '',
            categoryFields: [{
                selectedIndex: '',
                selectedValue: '',
                allCategories: [],
            }],

            testo: 'aaa',

            file1: '',
            imagePreviewUrl1: '',
            file2: '',
            imagePreviewUrl2: '',

            country: this.props.user.country,
            address: this.props.user.address,
            locationDescription: '',

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
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleCategoryPick = this.handleCategoryPick.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.onFile1Change = this.onFile1Change.bind(this); 

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
                            selectedIndex: '',
                            selectedValue: '',
                            allCategories: data,
                        }],
                    }
                });
            });

        nominatimApi.getGeoLocation(this.state.locationQuery)
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

        auctionsApi.getUserAuctions()
            .then(data => {
                this.setState((prevState, props) => { return { auctions: data } });
            })
    }


    handleChange(e) {
        const { name, value } = e.target;
        this.setState((prevState, props) => { return { [name]: value } });
    }

    handleDateChange(date) {
        this.setState((prevState, props) => { return { endingDate: date } });
    }

    handleCountryChange(e) {
        const { value } = e.target;
        this.setState((prevState, props) => {
            const query = prevState.address + ', ' + value;
            return {
                country: value,
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

    updateMap() {
        const query = this.state.locationQuery;
        nominatimApi.getGeoLocation(query)
            .then(data => {
                const coords = data.features[0].geometry.coordinates;
                // Coordinates are given in reverse order from API
                this.setState((prevState, props) => {
                    return {
                        startingLat: coords[1],
                        startingLng: coords[0]
                    }
                });
            });
    }


    handleAddressChange(e) {
        const { value } = e.target;
        this.setState((prevState, props) => {
            const query = value + ', ' + prevState.country;
            return {
                address: value,
                locationQuery: query
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

    onFile1Change(event) {
        console.log(event);
        this.setState((prevState, props) => { return { file1: event.target.files[0] }});
    }


    handleSubmit(e) {
        e.preventDefault();
        const { name, description, endingDate, firstBid, buyout, categoryFields,
            country, locationDescription, selectedLat, selectedLng } = this.state;
        
        // Convert category fields to categories for API
        let categories = [];
        for (let cat of categoryFields) {
            if (cat.selectedValue != "") {
                categories.push({ name: cat.selectedValue });
            }
        }

        // Convert Date object to proper format
        const convertedEndingDate = format(endingDate, 'MMM-dd-yy HH:mm:ss');

        this.setState((prevState, props) => { return { isLoading: true, }});
        auctionsApi.createAuction(name, description, convertedEndingDate,
            firstBid, buyout, categories, country, locationDescription,
            selectedLat, selectedLng)
            .then(data => {
                this.setState((prevState, props) => { return { isLoading: false, }});
                history.push('/myauctions');
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
        const { name, description, endingDate, firstBid, buyout, isLoading, categoryFields, file1 } = this.state;

        const { currentStep, country, address, locationDescription, locationQuery,
            startingLat, startingLng, selectedLat, selectedLng, hasLocation } = this.state;



        const { classes } = this.props;
        return (
            <Sidebar>
                <div className={classes.root}>
                    <Grid
                        className={classes.grid}
                        container
                        justify="center"
                    >


                        {currentStep === 2 ? (
                            <>
                                <Grid
                                    className={classes.locationWrapper}
                                    item
                                    lg={3}
                                >
                                    <Paper className={classes.paper}>
                                        <AuctionLocationForm
                                            country={country}
                                            address={address}
                                            locationDescription={locationDescription}

                                            handleCountryChange={this.handleCountryChange}
                                            handleAddressChange={this.handleAddressChange}
                                            handleChange={this.handleChange}
                                            updateMap={this.updateMap}
                                        />


                                        <div className={classes.progressButtons}>
                                            <Button
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

                                <Grid
                                    className={classes.rightWrapper}
                                    item
                                    lg={7}
                                >
                                    <Paper className={classes.paper}>
                                        <CreateAuctionMap
                                            locationQuery={locationQuery}
                                            startingLat={startingLat}
                                            startingLng={startingLng}
                                            selectedLat={selectedLat}
                                            selectedLng={selectedLng}
                                            hasLocation={hasLocation}

                                            handleChange={this.handleChange}
                                            handleMapClick={this.handleMapClick}
                                            updateMap={this.updateMap}
                                        />
                                    </Paper>
                                </Grid>
                            </>
                        ) : (

                                <>

                                    <Grid
                                        className={classes.detailsWrapper}
                                        item
                                        lg={6}
                                    >
                                        <Paper className={classes.paper}>
                                            <AuctionDetailsForm
                                                name={name}
                                                description={description}
                                                endingDate={endingDate}
                                                firstBid={firstBid}
                                                buyout={buyout}
                                                categoryFields={categoryFields}
                                                testo={this.state.testo}


                                                handleChange={this.handleChange}
                                                handleDateChange={this.handleDateChange}
                                                handleCategoryPick={this.handleCategoryPick}
                                            />

                                            <div className={classes.progressButtons}>
                                                <Button
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

                                    <Grid
                                        className={classes.rightWrapper}
                                        item
                                        lg={4}
                                    >
                                        <Paper className={classes.paper}>
                                            <AuctionPhotoUpload
                                                file1={file1}
                                                onFile1Change={this.onFile1Change}

                                                handleChange={this.handleChange}
                                            />
                                        </Paper>
                                    </Grid>

                                </>

                            )}

                        {/* <Grid
                            className={classes.buttonWrapper}
                            item
                            lg={10}
                        > */}
                        {/* <Paper className={classes.buttonPaper}> */}
                        {/* <div className={classes.buttonPaper}>
                                    <CreateAuctionProgress 
                                        currentStep={currentStep}
                                        //canSubmit={canSubmit}

                                        prevStep={this.prevStep}
                                        nextStep={this.nextStep}
                                        handleSubmit={this.handleSubmit}
                                    />
                            </div> */}
                        {/* </Paper> */}
                        {/* </Grid> */}

                    </Grid>
                </div>
            </Sidebar>
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




