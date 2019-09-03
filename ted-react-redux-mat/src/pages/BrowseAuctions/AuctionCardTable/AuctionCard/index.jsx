import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid } from '@material-ui/core';

import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 270,
        minHeight: 380,
        height: '100%',
    },
    media: {
        height: 260,

        // height: 0,
        // paddingTop: '56.25%', // 16:9
    },
}));

export default function MediaCard(props) {
    const { auction } = props;
    const imageUrl = auction.photos[0] ? auction.photos[0].fileDownloadUri : auction.defaultPhoto.fileDownloadUri;
    const lastCategory = auction.categories.length > 0 ? auction.categories[auction.categories.length - 1].name : " "


    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <Grid container style={{ height: '100%' }} direction="column" justify="space-between">
                <CardActionArea
                    style={{ flexGrow: 1 }}
                    component={Link}
                    to={{
                        pathname: '/viewauction',
                        state: {
                            auction: auction
                        }
                    }}
                >
                    <Grid item container direction="column" justify="flex-end">
                        <CardMedia
                            className={classes.media}
                            image={imageUrl}
                            title={auction.name}
                        />
                        <CardContent style={{ flexGrow: 1 }}>
                            <Grid container direction="column" justify="space-between">
                                <Grid item>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {auction.name}
                                    </Typography>
                                    <Typography variant="body2" color="textPrimary" component="p">
                                        {lastCategory}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container justify="flex-end">
                                        <Typography variant="body2" color="textPrimary" component="p">
                                            {"Current bid: " + auction.currently}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Grid>
                </CardActionArea>
                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        component={Link}
                        to={{
                            pathname: '/viewauction',
                            state: {
                                auction: auction
                            }
                        }}
                    >
                        Learn More
                </Button>
                </CardActions>
            </Grid>
        </Card>
    );
}