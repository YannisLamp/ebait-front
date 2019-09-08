import React from 'react';

// Material components
import { Divider, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

// Component styles
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: theme.spacing(4),
        textAlign: 'center',
        marginBottom: theme.spacing(4),
    },
    company: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(0.5)
    },
    inline: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heart: {
        marginLeft: theme.spacing(1),
        color: 'rgb(220, 0, 78)',
    }
}));

export default function Footer(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Divider />
            <Typography
                className={classes.company}
                variant="body1"
            >
                &copy; Gangas Dimitris, Lamprou Yannis
            </Typography>
            <div className={classes.inline}>
                <Typography variant="subtitle2">
                    Made with Love
                </Typography>
                <FavoriteIcon className={classes.heart}/>
            </div>
        </div>
    );
}