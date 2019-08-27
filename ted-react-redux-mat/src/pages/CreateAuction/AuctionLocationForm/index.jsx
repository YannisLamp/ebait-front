import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { history } from '../../../utils';

import { registerApi } from '../../../services';

import PaperTitle from '../../../sharedComp/PaperTitle';

// Material
import { IconButton, CircularProgress, TextField, Typography } from '@material-ui/core';

// For importing my custom styles  
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    grid: {
        height: '100%',
    },
    textField: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: '70%'
    },

}));


export default function AuctionLocationForm(props) {

    const { country, address, locationDescription } = props;
    const { handleCountryChange, handleAddressChange, handleChange, updateMap } = props;

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <PaperTitle
                title='Create an Auction'
                suggestion='fill in your location details'
            />


            {/* <div className={classes.fields}> */}
                <TextField
                    className={classes.textField}
                    label="Country"
                    name="country"
                    value={country}
                    type="text"
                    variant="outlined"
                    onChange={handleCountryChange}
                    onBlur={updateMap}
                />
                <TextField
                    className={classes.textField}
                    label="Address"
                    name="address"
                    value={address}
                    type="text"
                    variant="outlined"
                    onChange={handleAddressChange}
                    onBlur={updateMap}
                />
                <TextField
                    className={classes.textField}
                    label="Location Description"
                    name="locationDescription"
                    value={locationDescription}
                    type="text"
                    variant="outlined"
                    onChange={handleChange}
                />


        </div>
    );
}