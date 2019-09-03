import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Material
import { Grid, Button, Typography, CircularProgress, TextField } from '@material-ui/core';
import { connect } from 'react-redux';

import PaperTitle from '../../../sharedComp/PaperTitle';


import { makeStyles } from '@material-ui/core';


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


function AuctionDetails(props) {

    const { user, auction, myBid, isBidding, isBuying, } = props;
    const { handleChange, placeBid, buyoutAuction } = props;
    const hasPriv = !user || (user.userRole === 'USER' && user.verified === false) ? false : true;

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
                        title={auction.name}
                    //suggestion={'Auction Details'}
                    />

                    <div className={classes.marginFromTitle}>
                        <Typography >
                            {'Description: ' + auction.description}
                        </Typography>

                    </div>

                    <Typography >
                        {'Ends On: ' + auction.ends}
                    </Typography>
                </Grid>


                <Grid item>
                    <Typography >
                        {'Current Bid: ' + auction.currently}
                        {auction.bids.length > 0 ? 'From: ' : ' '}
                    </Typography>
                    <Typography >
                        {'Started From: ' + auction.firstBid}
                    </Typography>

                    <Button
                        className={classes.bidButton}
                        color="primary"
                        type="submit"
                        onClick={buyoutAuction}
                        size="large"
                        variant="contained"
                        disabled={auction.eventFinished || !hasPriv}
                    >
                        Buyout
                    </Button>
                    <Grid container justify="flex-end">
                        <TextField
                            name="myBid"
                            value={myBid}
                            label="myBid"
                            type="text"
                            variant="outlined"
                            onChange={handleChange}
                            disabled={auction.eventFinished || !hasPriv}
                        />
                        <Button
                            className={classes.bidButton}
                            color="primary"
                            type="submit"
                            onClick={placeBid}
                            size="large"
                            variant="contained"
                            disabled={auction.eventFinished || !hasPriv}
                        >
                            Place Bid
                        </Button>
                    </Grid>
                </Grid>

            </Grid>

        </div>
    );

}

function mapStateToProps(state) {
    const { userStore } = state;
    const { user } = userStore;
    return {
        user,
    };
}


const connectedAuctionDetails = connect(mapStateToProps)(AuctionDetails);
export default connectedAuctionDetails;