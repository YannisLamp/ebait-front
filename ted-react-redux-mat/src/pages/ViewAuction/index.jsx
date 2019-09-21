import React, { Component } from 'react';

// Material
import { Grid, Paper } from '@material-ui/core';

// For importing my custom styles  
import { withStyles } from '@material-ui/core';
import { pageStyles } from '../pageStyles';

import AuctionDetails from './AuctionDetails';
import AuctionCarousel from './AuctionCarousel';
import ViewAuctionMap from './ViewAuctionMap';

import { auctionsApi } from '../../services';
import { nominatimApi } from '../../services';


const styles = theme => ({
    ...pageStyles(theme),
    paper: {
        width: '100%',
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        marginBottom: theme.spacing(3),
        minHeight: '80vh',
        height: '100%',
    },
    carouselPaper: {
        width: '100%',
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        marginBottom: theme.spacing(1),
        //maxHeight: '40vh',
        //height: '45%',
        minHeight: '40vh',
    },
    mapPaper: {
        width: '100%',
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingBottom: theme.spacing(2),
        marginBottom: theme.spacing(3),
        //maxHeight: '40vh',
        //height: '50%',
        minHeight: '40vh',
    },
    prevWrapper: {
        marginTop: theme.spacing(12),
        marginRight: theme.spacing(7),
    },
    rightWrapper: {
        marginTop: theme.spacing(12),
        marginRight: theme.spacing(4),
    },
});


class ViewAuction extends Component {

    state = {
        auction: this.props.location.state.auction,

        myBid: '',
        isBidding: false,
        isBuying: false,

        isFullscreenPhotos: false,
        fullscreenIndex: 0,
    };

    componentDidMount = () => {
        const { auction } = this.state;
        auctionsApi.getAuctionById(auction.itemID);

        if (!auction.location.latitude || auction.location.longitude) {
            const { text } = auction.location;
            this.queryAuctionLocation(text);
        }
    }

    queryAuctionLocation = (query) => {
        nominatimApi.getGeoLocation(query)
            .then(data => {
                if (data.features.length > 0) {
                    const coords = data.features[0].geometry.coordinates;
                    // Coordinates are given in reverse order from API
                    this.setState((prevState, props) => {
                        let { auction } = prevState;
                        auction.location.latitude = coords[1];
                        auction.location.longitude = coords[0];
                        return {
                            auction
                        }
                    });
                }
            })
    }

    placeBid = () => {
        const { auction, myBid } = this.state;
        const itemID = auction.itemID;
        this.setState((prevState, props) => { return { isBidding: true } });

        auctionsApi.placeBid(itemID, myBid)
            .then(response => {
                this.setState((prevState, props) => { return { isBidding: false } });
            })
    }

    buyoutAuction = () => {
        const { auction } = this.state;
        const itemID = auction.itemID;
        this.setState((prevState, props) => { return { isBuying: true } });

        auctionsApi.buyoutAuction(itemID)
            .then(response => {
                this.setState((prevState, props) => { return { isBuying: false } });
            })
    }

    changeFullscreenPhotos = () => {
        this.setState((prevState, props) => { return { isFullscreenPhotos: !prevState.isFullscreenPhotos } });
    }

    setFullscreenIndex = (index) => {
        this.setState((prevState, props) => { return { fullscreenIndex: index } });
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState, props) => { return { [name]: value } });
    }

    render() {
        const { auction, isFullscreenPhotos, fullscreenIndex, myBid } = this.state;
        let photos = [];
        if (auction.photos.length === 0) {
            photos.push(auction.defaultPhoto);
        }
        else {
            photos = auction.photos;
        }

        console.log('AUCTIONNNNN');
        console.log(auction);

        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid
                    className={classes.grid}
                    container
                    //alignItems="center"
                    justify="center"
                >
                    <Grid
                        className={classes.prevWrapper}
                        item
                        lg={4}
                    >
                        <Grid
                            style={{ height: '100%' }}
                            container
                            direction="column"
                            justify="flex-start"
                        >

                            {/* <Grid item> */}
                            <Paper className={classes.carouselPaper}>
                                <AuctionCarousel
                                    photos={photos}
                                    isFullscreenPhotos={isFullscreenPhotos}
                                    fullscreenIndex={fullscreenIndex}

                                    changeFullscreenPhotos={this.changeFullscreenPhotos}
                                    setFullscreenIndex={this.setFullscreenIndex}
                                />
                            </Paper>
                            {/* </Grid> */}

                            {/* <Grid item> */}
                            <Paper className={classes.mapPaper}>
                                <ViewAuctionMap lat={auction.location.latitude} lng={auction.location.longitude} />
                            </Paper>
                            {/* </Grid> */}

                        </Grid>
                    </Grid>

                    <Grid
                        className={classes.rightWrapper}
                        item
                        lg={6}
                    >
                        <Grid
                            style={{ height: '100%' }}
                            container
                            direction="column"
                            justify="flex-start"
                        >
                            <Paper className={classes.paper}>
                                <AuctionDetails
                                    auction={auction}

                                    myBid={myBid}

                                    handleChange={this.handleChange}
                                    placeBid={this.placeBid}
                                    buyoutAuction={this.buyoutAuction}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const styledViewAuction = withStyles(styles)(ViewAuction);
export default styledViewAuction;