import React from 'react';

import { Grid, Button, Typography, TextField } from '@material-ui/core';
import { connect } from 'react-redux';

import PaperTitle from '../../../sharedComp/PaperTitle';
import ConfirmDialog from '../../../sharedComp/ConfirmDialog';


import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: 'inherit',
    },
    description: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),

        overflow: 'auto',
        display: 'block',
        height: '50vh',
    },
    notDecorated: {
        textDecoration: 'none',
        cursor: 'pointer',
    },
    grid: {
        height: '100%',
    },
    bidButton: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(1),
        height: '55px',
        paddingTop: theme.spacing(1),
    },
    bidText: {
        //height: '40px',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
}));


function AuctionDetails(props) {

    const { user, auction, myBid, modalBidOpen, modalBuyOpen } = props;
    const { handleChange, placeBid, buyoutAuction, changeBidModal, changeBuyModal } = props;
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

                    <div className={classes.description}>
                        <Typography >
                            {'Description: ' + auction.description}
                        </Typography>

                    </div>

                    <Typography>
                        {'Auction Ends On: ' + auction.ends}
                    </Typography>
                </Grid>


                <Grid item>
                    {auction.bids.map((bid, index) => {
                        return (
                            <Typography variant="h6" key={index}>
                                {'Bid: ' + index + ": " + bid.amount + "$ On: " + bid.time + " From: " + user.firstName + " " + user.lastName}
                            </Typography>
                        );
                    })}
                    <Typography variant="h6">
                        {'Current Bid: ' + auction.currently}
                        {/* {auction.bids.length > 0 ? 'From: ' : ' '} */}
                    </Typography>
                    {/* <Typography >
                        {'Started From: ' + auction.firstBid}
                    </Typography> */}
                    <Grid container justify="flex-end">
                        <Button
                            className={classes.bidButton}
                            color="primary"
                            type="submit"
                            onClick={changeBuyModal}
                            size="large"
                            variant="contained"
                            disabled={!auction.buyPrice || auction.eventFinished || !hasPriv}
                        >
                            &nbsp;&nbsp;Buyout&nbsp;&nbsp;
                    </Button>
                        <ConfirmDialog
                            open={modalBuyOpen}
                            title={"Confirm Buyout?"}
                            text={"Are you sure you want to buyout " + auction.name + "?"}

                            handleCloseModal={changeBuyModal}
                            confirmAction={buyoutAuction}
                        />
                    </Grid>

                    <Grid container justify="flex-end">
                        <TextField
                            className={classes.bidText}
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
                            onClick={changeBidModal}
                            size="large"
                            variant="contained"
                            disabled={auction.eventFinished || !hasPriv || myBid === ""}
                        >
                            Place Bid
                        </Button>
                        <ConfirmDialog
                            open={modalBidOpen}
                            title={"Confirm Bid"}
                            text={"Are you sure you want to bid " + myBid + "$ for " + auction.name + "?"}

                            handleCloseModal={changeBidModal}
                            confirmAction={placeBid}
                        />

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