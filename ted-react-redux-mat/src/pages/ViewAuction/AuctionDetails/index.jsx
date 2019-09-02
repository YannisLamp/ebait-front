import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Material
import {
    Grid, Button, Typography, CircularProgress, TextField
} from '@material-ui/core';

import { CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxBlankIcon } from '@material-ui/icons';

import PaperTitle from '../../../sharedComp/PaperTitle';


import { makeStyles } from '@material-ui/core';

import { auctionsApi } from '../../../services'


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: 'inherit',
    },
    marginFromTitle: {
        marginTop: theme.spacing(4),
    },
    notDecorated: {
        textDecoration: 'none',
        cursor: 'pointer',
    },
    grid: {
        height: '100%',
    },
    bidButton: {
        margin: theme.spacing(1),
    }
}));


export default function AuctionDetails(props) {

    const { name, description, currentBid, firstBid, myBid, isBidding, isBuying, } = props;
    const { handleChange, placeBid } = props;


    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid
                className={classes.grid}
                container
                direction="column"
                justify="space-between"
            >
                <Grid item>
                    <PaperTitle
                        title={name}
                    //suggestion={'Auction Details'}
                    />

                    <div className={classes.marginFromTitle}>
                        <Typography >
                            {description}
                        </Typography>

                    </div>
                </Grid>


                <Grid item>
                    <Typography >
                        {'Current Bid: ' + firstBid}
                    </Typography>

                    <Grid container justify="flex-end">
                        <TextField
                            name="myBid"
                            value={myBid}
                            label="myBid"
                            type="text"
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <Button
                            className={classes.bidButton}
                            color="primary"
                            type="submit"
                            onClick={placeBid}
                            size="large"
                            variant="contained"
                        >
                            Place Bid
                        </Button>
                    </Grid>
                </Grid>

            </Grid>

        </div>
    );

}