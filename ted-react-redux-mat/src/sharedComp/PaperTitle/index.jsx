import React from 'react';

// Material components
import { Divider, Typography } from '@material-ui/core';

// Component styles
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        //backgroundColor: theme.palette.primary.light,
    },
    suggestion: {
        color: theme.palette.text.primary,
        marginTop: theme.spacing(2),
        textAlign: 'left'
    },
    divider: {
        marginTop: theme.spacing(1),
    },
}));

export default function PaperTitle(props) {
    const classes = useStyles();

    const { title, suggestion } = props;
    return (
        <div className={classes.root}>
            <Typography
                className={classes.title}
                variant="h3"
            >
                {title}
            </Typography>
            <Typography
                className={classes.suggestion}
                variant="body1"
            >
                {suggestion}
            </Typography>

            <Divider className={classes.divider} />
        </div>
    );
}