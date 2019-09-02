import React from 'react';

// Material
import { Grid, Typography } from '@material-ui/core';

// For importing my custom styles  
import { makeStyles } from '@material-ui/core/styles';
import { pageStyles } from '../pageStyles';


const useStyles = makeStyles(theme => ({
    //...pageStyles(theme),
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    formPaper: {
        minHeight: '75vh',
    },
    quote: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundPosition: 'center'
      },
      quoteInner: {
        textAlign: 'center',
        flexBasis: '600px'
      },
      welcomeText: {
        fontSize: '50px',
        color: theme.palette.primary.main,
        fontWeight: 400,
        marginBottom: theme.spacing(10),
      },
      quoteText: {
        color: theme.palette.primary.main,
        fontWeight: 300
      },

}));

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