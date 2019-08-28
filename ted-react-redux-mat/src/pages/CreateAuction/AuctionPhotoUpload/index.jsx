import React from 'react';

import { Grid, TextField, Button, ButtonBase, Typography } from '@material-ui/core';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import { makeStyles } from '@material-ui/core/styles';

//import OpenStreetMap from '../../../sharedComp/OpenStreetMap';


import PaperTitle from '../../../sharedComp/PaperTitle';
//import ContainerDimensions from 'react-container-dimensions'



const useStyles = makeStyles(theme => ({
    textField: {
        width: '50%',
    },
    mapTitle: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));


export default function AuctionPhotoUpload(props) {

    const { locationQuery, startingLat, startingLng, selectedLat, selectedLng, hasLocation } = props;
    const { handleChange, handleMapClick, updateMap } = props;
    const style = { height: '400px' };

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
                title='Upload Photos'
                suggestion={'optionally upload a maximum of two photos of your item'}
            />


            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" component="span" className={classes.button}>
                    Upload
                </Button>
            </label>

            <ButtonBase
                focusRipple
                key={'image.title'}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                    //width: image.width,
                    width: '50%'
                }}
            >
                <span
                    className={classes.imageSrc}
                    style={{
                        //backgroundImage: `url(${image.url})`,
                    }}
                />
                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton}>
                    <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                        className={classes.imageTitle}
                    >
                        {'image.title'}
                        <span className={classes.imageMarked} />
                    </Typography>
                </span>
            </ButtonBase>

        </div>
    );

}