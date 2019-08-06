import React from 'react';

// Material
import { Grid, Typography } from '@material-ui/core';

// For importing my custom styles  
import useStyles from './styles';

export default function NotFound(props) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid
                className={classes.grid}
                container
            >
                <Grid
                    lg={4}
                    xs={1}
                />
                <Grid
                    className={classes.content}
                    item
                    lg={4}
                    xs={10}
                    justify="center"
                >
                    <div className={classes.quote}>
                        <div className={classes.quoteInner}>
                            <Typography
                                className={classes.welcomeText}
                            >
                                404: Not Found :(
                            </Typography>
                            <Typography
                                className={classes.quoteText}
                                variant="h1"
                            >
                                Please navigate to the previous page.
                            </Typography>
                        </div>
                    </div>
                </Grid>
                <Grid
                    lg={3}
                    xs={1}
                />
            </Grid>
        </div>
    );
}