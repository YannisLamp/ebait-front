import React from 'react';

// Material
import { TextField, Grid } from '@material-ui/core';

// For importing my custom styles  
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    textField: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 180,
    },

}));


export default function AuctionFilters(props) {
    const { description, lowestPrice, highestPrice, location } = props;
    const { handleChange, refreshAuctions } = props;

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container justify="flex-start">
                <Grid item>
                    <TextField
                        className={classes.textField}
                        label="Item Description"
                        name="description"
                        value={description}
                        type="text"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={refreshAuctions}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        className={classes.textField}
                        label="Lowest Price"
                        name="lowestPrice"
                        value={lowestPrice}
                        type="text"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={refreshAuctions}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        className={classes.textField}
                        label="Highest Price"
                        name="highestPrice"
                        value={highestPrice}
                        type="text"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={refreshAuctions}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        className={classes.textField}
                        label="Location"
                        name="location"
                        value={location}
                        type="text"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={refreshAuctions}
                    />
                </Grid>
            </Grid>
        </div>
    );
}