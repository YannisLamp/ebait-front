import React, { Component } from 'react';
import produce from "immer";

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
        auction: this.props.location.state ? this.props.location.state.auction : null,

        myBid: '',
        isBidding: false,
        isBuying: false,

        isFullscreenPhotos: false,
        fullscreenIndex: 0,

        modalBidOpen: false,
        modalBuyOpen: false,

        lat: '',
        lng: '',
    };

    componentDidMount = () => {
        const { auction } = this.state;
        this.refreshAuctionById();
        this.auctionPolling = setInterval( 
            () => { 
                this.refreshAuctionById();
            },
            20000
        );

        if (auction && (!auction.location.latitude || !auction.location.longitude)) {
            const { text } = auction.location;
            this.queryAuctionLocation(text);
        }
        else if (auction) {
            this.setState((prevState, props) => {
                return {
                    lat: auction.location.latitude,
                    lng: auction.location.longitude
                }
            });
        }
    }

    componentWillUnmount() {
        clearInterval(this.dataPolling);
    }

    refreshAuctionById = () => {
        const id = this.props.match.params.id;
        auctionsApi.getAuctionById(id)
            .then(data => {
                if (data) {
                    this.setState((prevState, props) => {
                        return {
                            auction: data,
                            isBidding: false,
                            isBuying: false,
                            myBid: '',
                        }
                    });
                }
            });
    }

    queryAuctionLocation = (query) => {
        nominatimApi.getGeoLocation(query)
            .then(data => {
                if (data.features.length > 0) {
                    const coords = data.features[0].geometry.coordinates;
                    // Coordinates are given in reverse order from API
                    this.setState((prevState, props) => {
                        return produce(prevState, draft => {
                            let { auction } = draft;
                            auction.location.latitude = coords[1];
                            auction.location.longitude = coords[0];

                            draft.lat = coords[1];
                            draft.lng = coords[0];
                        });
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
                this.refreshAuctionById();
            })
    }

    buyoutAuction = () => {
        const { auction } = this.state;
        const itemID = auction.itemID;
        this.setState((prevState, props) => { return { isBuying: true } });

        auctionsApi.buyoutAuction(itemID)
            .then(response => {
                this.refreshAuctionById();
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

    changeBidModal = () => {
        this.setState((prevState, props) => { return { modalBidOpen: !prevState.modalBidOpen } });
    }

    changeBuyModal = () => {
        this.setState((prevState, props) => { return { modalBuyOpen: !prevState.modalBuyOpen } });
    }

    render() {
        const { auction, isFullscreenPhotos, fullscreenIndex, myBid, modalBidOpen, modalBuyOpen, lat, lng } = this.state;

        if (auction) {
            let photos = [];
            if (auction.photos.length === 0) {
                photos.push(auction.defaultPhoto);
            }
            else {
                photos = auction.photos;
            }

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
                                    <ViewAuctionMap lat={lat} lng={lng} />
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
                                        modalBidOpen={modalBidOpen}
                                        modalBuyOpen={modalBuyOpen}

                                        handleChange={this.handleChange}
                                        placeBid={this.placeBid}
                                        buyoutAuction={this.buyoutAuction}
                                        changeBidModal={this.changeBidModal}
                                        changeBuyModal={this.changeBuyModal}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            );

        }
        else {
            return null;
        }
    }
}

const styledViewAuction = withStyles(styles)(ViewAuction);
export default styledViewAuction;