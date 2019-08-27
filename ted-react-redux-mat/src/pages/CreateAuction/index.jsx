import React, { Component } from 'react';

// Material
import { Grid, Paper, Button, TextField } from '@material-ui/core';

import { connect } from 'react-redux';

// For importing my custom styles  
import { withStyles } from '@material-ui/core/styles';
import { pageStyles } from '../pageStyles';

import Sidebar from '../../sharedComp/Sidebar';
import AuctionLocationForm from './AuctionLocationForm';
import CreateAuctionMap from './CreateAuctionMap';

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
        height: '70vh'
    },
    buttonWrapper: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(10),
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
    locationDetailsWrapper: {
        marginTop: theme.spacing(14),
        marginRight: theme.spacing(10),
    },
});

class CreateAuction extends Component {

    constructor(props) {
        super(props);
        this.state = {

            country: this.props.user.country,
            address: this.props.user.address, 
            locationDescription: '',
            locationQuery: this.props.user.address + ', ' + this.props.user.country,
            startingLat: null,
            startingLng: null,
            selectedLat: null,
            selectedLng: null,
            hasLocation: false,

            currentStep: 1,
        };

        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
        this.updateMap = this.updateMap.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.prevStep = this.prevStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }


    componentDidMount() {
        // auctionsApi.getCategories()
        //     .then(res => {
        //         console.log(res);
        //     })

        nominatimApi.getGeoLocation(this.state.locationQuery)
            .then(data => {
                const coords = data.features[0].geometry.coordinates;
                // Coordinates are given in reverse order from API
                this.setState((prevState, props) => { return { 
                    startingLat: coords[1],
                    startingLng: coords[0] 
                }});
            })
    }


    handleChange(e) {
        const { name, value } = e.target;
        this.setState((prevState, props) => { return { [name]: value } });
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


    // const query = prevState.address + ', ' + value;
    //         nominatimApi.getGeoLocation(query)
    //             .then(data => {
    //                 const coords = data.features[0].geometry.coordinates;
    //                 // Coordinates are given in reverse order from API
    //                 this.setState((prevState, props) => { return { 
    //                     startingLat: coords[1],
    //                     startingLng: coords[0]  
    //                 }});
    //             })


    // const query = value + ', ' + prevState.country;
    //         nominatimApi.getGeoLocation(query)
    //             .then(data => {
    //                 const coords = data.features[0].geometry.coordinates;
    //                 // Coordinates are given in reverse order from API
    //                 this.setState((prevState, props) => { return { 
    //                     startingLat: coords[1],
    //                     startingLng: coords[0]  
    //                 }});
    //             })


    updateMap() {
        const query = this.state.locationQuery;
        nominatimApi.getGeoLocation(query)
            .then(data => {
                const coords = data.features[0].geometry.coordinates;
                // Coordinates are given in reverse order from API
                this.setState((prevState, props) => { return { 
                    startingLat: coords[1],
                    startingLng: coords[0]  
                }});
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
        this.setState((prevState, props) => { return { 
            selectedLat: e.latlng.lat,
            selectedLng: e.latlng.lng,
            hasLocation: true,
        }});
    }


    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, firstName, lastName, email, phoneNumber,
            country, address, afm } = this.state;
        const { dispatch } = this.props;

        // Check validity 
        if (username && password && firstName && lastName && email && phoneNumber &&
            country && address && afm) {
            // dispatch(registerApi.registerThunk(username, password, firstName,
            //     lastName, email, phoneNumber, country, address, afm));
        }

        const { user } = this.props;
        console.log(user);
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


        
    // function formForStep(step, comp) {
    //     if (step === 1) {
    //         const { username, password, confirmPassword } = comp.state;
    //         return (
    //             < CredentialForm
    //                 handleChange={comp.handleChange}
    //                 checkPasswordMatch={comp.checkPasswordMatch}
    //                 checkUsernameExists={comp.checkUsernameExists}

    //                 username={username}
    //                 password={password}
    //                 confirmPassword={confirmPassword}
    //                 usernameTaken={usernameTaken}
    //                 passwordsMatch={passwordsMatch}
    //             />
    //         );
    //     }
    //     else if (step === 2) {
    //         const { firstName, lastName, email, phoneNumber } = comp.state;
    //         return (
    //             < BasicInfoForm
    //                 handleChange={comp.handleChange}

    //                 firstName={firstName}
    //                 lastName={lastName}
    //                 email={email}
    //                 phoneNumber={phoneNumber}
    //             />
    //         );
    //     }
    //     else if (step === 3) {
    //         const { country, address, afm } = comp.state;
    //         return (
    //             < LocationForm
    //                 handleChange={comp.handleChange}

    //                 country={country}
    //                 address={address}
    //                 afm={afm}
    //             />
    //         );
    //     }
    // }

    // let currentForm = formForStep(currentStep, this);
        const { country, address, locationDescription, locationQuery, 
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

                        <Grid
                            className={classes.locationDetailsWrapper}
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
                            </Paper>
                        </Grid>

                        <Grid
                            className={classes.pageWrapper}
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

                        <Grid
                            className={classes.buttonWrapper}
                            item
                            lg={10}
                        >
                            <Paper className={classes.buttonPaper}>
                                            <Button
                                            className={classes.button}
                                        color="primary"
                                        size="large"
                                        variant="contained"
                                    >
                                        Register
                                    </Button>
                            </Paper>
                        </Grid>

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




