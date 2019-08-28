import React, { Component } from 'react';

import PaperTitle from '../../../sharedComp/PaperTitle';

// Material
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import { IconButton, TextField, Typography } from '@material-ui/core';

import { InputLabel, MenuItem, FormControl, Select, Input, Chip, OutlinedInput } from '@material-ui/core';

// For importing my custom styles  
import { makeStyles, useTheme } from '@material-ui/core';

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
        width: '40%'
    },
    description: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(1),
    },
    chip: {
        margin: 2,
    },
    categoriesField: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: '40%',
        marginBottom: theme.spacing(2),
    }

}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }


export default function AuctionDetailsForm(props) {
    const { name, description, endingDate, firstBid, buyout, allCategories, selectedCategories } = props;
    const { handleChange, handleDateChange, handleCategoryChange } = props;

    // Some React hook magic from material ui so that the outlined stuff work
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const theme = useTheme();
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
                <KeyboardDatePicker
                    className={classes.textField}
                    disableToolbar
                    variant="inline"
                    inputVariant="outlined"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="ending-date"
                    label="Ending Date"
                    value={endingDate}
                    name="endingDate"
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
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
            
            <FormControl 
                className={classes.categoriesField} 
                variant="outlined"
            >
                    <InputLabel ref={inputLabel} htmlFor="select-multiple-chip">Categories</InputLabel>
                        <Select
                            multiple
                            value={selectedCategories}
                            name="selectedCategories"
                            onChange={handleChange}
                            input={<OutlinedInput labelWidth={labelWidth} id="select-multiple-chip" />}
                            renderValue={selected => (
                                <div className={classes.chips}>
                                {selected.map(value => (
                                    <Chip key={value} label={value} className={classes.chip} />
                                ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                            >
                            {allCategories.map(cat => (
                                <MenuItem 
                                    key={cat.name} 
                                    value={cat.name} 
                                    //style={getStyles(cat.name, selectedCategories, theme)}
                                >
                                {cat.name}
                                </MenuItem>
                            ))}
                        </Select>

                </FormControl>

        </div>
    );
}