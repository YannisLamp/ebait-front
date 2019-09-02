import React from 'react';

// Material components
import { Divider, Typography } from '@material-ui/core';

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
                &copy; Stackoverflow
            </Typography>
            <Typography variant="subtitle2">
                Epaggelmatiko site
            </Typography>
        </div>
    );
}