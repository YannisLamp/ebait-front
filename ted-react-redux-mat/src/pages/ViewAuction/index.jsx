import React, { Component } from 'react';

// Material
import { Grid, Paper } from '@material-ui/core';

// For importing my custom styles  
import { withStyles } from '@material-ui/core';
import { pageStyles } from '../pageStyles';

import Sidebar from '../../sharedComp/Sidebar';
import UserTable from './AuctionDetails';

import { usersApi } from '../../services';
import { nominatimApi } from '../../services';


const styles = theme => ({
    ...pageStyles(theme),
    paper: {
        width: '100%',
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingBottom: theme.spacing(4),
        marginBottom: theme.spacing(2),
        minHeight: '80vh',
    },
    prevPaper: {
        width: '100%',
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        marginBottom: theme.spacing(1),
        minHeight: '40vh',
    },
    prevWrapper: {
        marginTop: theme.spacing(14),
        marginRight: theme.spacing(7),
    },
});


class ViewAuction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            auction: this.props.auction,
            
            isLoading: true,
        };

        this.queryAuctionLocation = this.queryAuctionLocation.bind(this);
        
    }

    componentDidMount() {
        //const { 
        //this.queryAuctionLocation(query);
    }


    queryAuctionLocation(query) {
        nominatimApi.getGeoLocation(query)
            .then(data => {
                const coords = data.features[0].geometry.coordinates;
                // Coordinates are given in reverse order from API
                this.setState((prevState, props) => {
                    let { auction } = prevState;
                    //auction.
                    return {
                        auction
                    }
                });
            })
    }


    render() {
        const { users, order, orderBy, pageSize, currPage, totalPages,
            totalUsers, isLoading, userToVerify, isVerifying } = this.state;
        
        const { classes } = this.props;
        return (
            <Sidebar>
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
                                style={{height: '100%'}}
                                container
                                direction="column"
                                justify="flex-start"
                            >

                                <Paper className={classes.prevPaper}>
                                   
                                </Paper>


                                <Paper className={classes.prevPaper}>
                                   
                                </Paper>


                            </Grid>



                        </Grid>





                        <Grid
                            className={classes.rightWrapper}
                            item
                            lg={6}
                        >

                            <Grid
                                style={{height: '100%'}}
                                container
                                direction="column"
                                justify="flex-start"
                            >

                            <Paper className={classes.paper}>
                                
                            </Paper>
                            
                            </Grid>

                        </Grid>


                    </Grid>
                </div>
            </Sidebar>
        );
    }
}

const styledViewAuction = withStyles(styles)(ViewAuction);
export default styledViewAuction;