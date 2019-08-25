import React from 'react';
import { Link } from 'react-router-dom';

// Material
import { Grid, Paper, Button, TextField } from '@material-ui/core';

// For importing my custom styles  
import { makeStyles } from '@material-ui/core/styles';
import { pageStyles } from '../pageStyles';

import Sidebar from '../../sharedComp/Sidebar';
import AuctionForm from './AuctionForm';
import OpenStreetMap from './OpenStreetMap';
import PaperTitle from '../../sharedComp/PaperTitle';

//import './mapStyles.css';

import ContainerDimensions from 'react-container-dimensions'

import { nominatimApi } from '../../services';
import { auctionsApi } from '../../services';


const useStyles = makeStyles(theme => ({
    ...pageStyles(theme),
    paper: {
        width: '100%',
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        marginBottom: theme.spacing(2),
        //minHeight: '80vh',
        height: '80vh'
    },
    locationDetailsWrapper: {
        marginTop: theme.spacing(14),
        marginRight: theme.spacing(10),
    },
    mapTitle: {
        marginTop: theme.spacing(2),
    }
}));

export default function ProfilePage(props) {

    const classes = useStyles();

    const lat = 45.6982642;
    const lng = 9.6772698;
    const zoom = 13;

    const position = [lat, lng];

    // nominatimApi.getGeoLocation('koropi, Greece')
    //     .then(res => {
    //         console.log(res);
    //     })

    auctionsApi.getCategories()
        .then(res => {
            console.log(res);
        })

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
                            <AuctionForm />
                        </Paper>
                    </Grid>

                    <Grid
                        className={classes.pageWrapper}
                        item
                        lg={7}
                    >
                        <Paper className={classes.paper}>
                            {/* <AuctionForm /> */}
                            <PaperTitle
                                title='Choose your Location'
                                suggestion={'or search for it'}
                            />
                            <TextField
                                className={classes.textField + ' ' + classes.mapTitle}
                                label="Location"
                                name="location"
                                //value={location}
                                type="text"
                                variant="outlined"
                            //onChange={this.handleChange}
                            />
                            <div style={{ height: '75%' }} className={classes.mapTitle}>

                                {/* We use ContainerDimensions here in order to be more dynamic,
                                as the OpenStreetMap needs to know its height explicitly */}
                                <ContainerDimensions>
                                    <OpenStreetMap lat={37.8997648} lng={23.8736294} />
                                </ContainerDimensions>
                            </div>

                        </Paper>
                    </Grid>

                </Grid>
            </div>
        </Sidebar>
    );
}




