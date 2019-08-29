import React from 'react';

import { Grid, TextField } from '@material-ui/core';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import { makeStyles } from '@material-ui/core/styles';

//import OpenStreetMap from '../../../sharedComp/OpenStreetMap';


import PaperTitle from '../../../sharedComp/PaperTitle';
//import ContainerDimensions from 'react-container-dimensions'



const useStyles = makeStyles(theme => ({
    textField: {
        width: '50%',
    },
    map: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
}));


export default function CreateAuctionMap(props) {

    const { locationQuery, startingLat, startingLng, selectedLat, selectedLng, hasLocation } = props;
    const { handleChange, handleMapClick, updateMap } = props;
    const style = { height: '450px' }; 

    const classes = useStyles();

    // If the user has clicked on the map, place a marker
    let marker = null
    if (hasLocation) {
        marker = (
            <Marker position={{ lat: selectedLat, lng: selectedLng }}>
                <Popup>Auction Location</Popup>
            </Marker>
        );
    }

    return (
        <div>

            <PaperTitle
                title='Choose your Location'
                suggestion={'or search for it'}
            />

            <TextField
                className={classes.textField + ' ' + classes.map}
                label="Location"
                name="locationQuery"
                value={locationQuery}
                type="text"
                variant="outlined"
                onChange={handleChange}
                onBlur={updateMap}
            />


            {startingLat && startingLng ? (
                <div className={classes.map}>
                    <Map
                        center={{ lat: startingLat, lng: startingLng }}
                        zoom={15}
                        onClick={handleMapClick}
                        // onLocationfound={this.handleLocationFound}
                        //ref={this.mapRef}

                        style={style}
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        />

                        {marker}

                    </Map>
                </div>
            ) : null}

        </div>
    );

}