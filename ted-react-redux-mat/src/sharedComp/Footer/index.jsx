import React from 'react';

// Material components
import { Divider, Typography } from '@material-ui/core';

// Component styles
import useStyles from './styles';

export default function Footer(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Divider />
            <Typography
                className={classes.company}
                variant="body1"
            >
                &copy; Di
            </Typography>
            <Typography variant="subtitle2">
                iHamod koita arxige
            </Typography>
        </div>
    );
}