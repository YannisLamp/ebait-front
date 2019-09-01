import React, { Component } from 'react';

import PaperTitle from '../../../sharedComp/PaperTitle';

// Material
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { Button, TextField, Typography } from '@material-ui/core';

import CategoryList from '../../../sharedComp/CategoryList';

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
        minWidth: '60%'
    },
    priceField: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: '30%'
    },
    description: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(1),
    },
    categories: {
        marginBottom: theme.spacing(4),
    },
    categoryField: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(1),
        width: '22%',
    },
}));


export default function AuctionDetailsForm(props) {
    const { name, description, ends, firstBid, buyout, categoryFields } = props;
    const { handleChange, handleDateChange, handleCategoryPick } = props;


    const classes = useStyles();
    return (
        <div className={classes.root}>
            <PaperTitle
                title='Create an Auction'
                suggestion='fill in your auction specifics'
            />


            {/* <div className={classes.fields}> */}

            {/* <Typography
                className={classes.description}
                variant="body1"
            >
                basic item info
            </Typography> */}

            <TextField
                className={classes.textField}
                label="Name"
                name="name"
                value={name}
                type="text"
                variant="outlined"
                onChange={handleChange}
            />
            <TextField
                className={classes.textField}
                label="Description"
                name="description"
                value={description}
                type="text"
                variant="outlined"
                multiline
                rowsMax="4"
                onChange={handleChange}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                    className={classes.textField}
                    variant="inline"
                    inputVariant="outlined"
                    ampm={false}
                    label="Ending Date"
                    value={ends}
                    onChange={handleDateChange}
                    onError={console.log}
                    disablePast
                    format="yyyy/MM/dd HH:mm"
                />

            </MuiPickersUtilsProvider>

            <Typography
                className={classes.description}
                variant="body1"
            >
                regarding prices
            </Typography>

            <TextField
                className={classes.priceField}
                label="First bid"
                name="firstBid"
                value={firstBid}
                type="text"
                variant="outlined"
                onChange={handleChange}
            />
            <TextField
                className={classes.priceField}
                label="Buyout"
                name="buyout"
                value={buyout}
                type="text"
                variant="outlined"
                onChange={handleChange}
            />

            <Typography
                className={classes.description}
                variant="body1"
            >
                choose categories that describe your item
            </Typography>

            <div className={classes.categories}>
                <CategoryList
                    categoryFields={categoryFields}
                    handleCategoryPick={handleCategoryPick}
                />
            </div>

        </div>
    );
}