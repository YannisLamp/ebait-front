import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { history } from '../../../utils';

import PaperTitle from '../../../sharedComp/PaperTitle';

// Material
import { IconButton, CircularProgress, TextField, Typography, Button } from '@material-ui/core';

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


export default function AuctionFilters(props) {
    const { country, description, lowestPrice, highestPrice, location } = props;
    const { handleChange, loadAuctions } = props;

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <PaperTitle
                title='Filter Auctions'
                suggestion='limit auction results to suit your preference'
            />


            {/* <div className={classes.fields}> */}
            {/* <TextField
                    className={classes.textField}
                    label="Country"
                    name="country"
                    value={country}
                    type="text"
                    variant="outlined"
                    onChange={handleCountryChange}
                    onBlur={updateMap}
                /> */}
            <TextField
                className={classes.textField}
                label="Item Description"
                name="description"
                value={description}
                type="text"
                variant="outlined"
                onChange={handleChange}
            //onBlur
            />
            <TextField
                className={classes.textField}
                label="Lowest Price"
                name="lowestPrice"
                value={lowestPrice}
                type="text"
                variant="outlined"
                onChange={handleChange}
            //onBlur
            />
            <TextField
                className={classes.textField}
                label="Highest Price"
                name="highestPrice"
                value={highestPrice}
                type="text"
                variant="outlined"
                onChange={handleChange}
            //onBlur
            />
            <TextField
                className={classes.textField}
                label="Location"
                name="location"
                value={location}
                type="text"
                variant="outlined"
                onChange={handleChange}
            />

            <Button
                className={classes.bottomButton}
                color="primary"
                type="submit"
                onClick={loadAuctions}
                size="large"
                variant="contained"
            >
                Make query
            </Button>
        </div>
    );
}