import React from 'react';
import { Link } from 'react-router-dom';

// Material
import { Card, CardContent, CardActions, CardActionArea, Typography } from '@material-ui/core';

// For importing my custom styles  
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    notDecorated: {
        textDecoration: 'none',
    },
    card: {
        color: "white",

    },
    text: {
        color: "black",
    },

}));

export default function WarningMsg(props) {
    const { backgroundColor, borderColor, warningText } = props;

    const classes = useStyles();
    return (
        <Card className={classes.card} >
                <CardContent style={{ backgroundColor }}>
                    <Typography variant="h5" className={classes.text}>
                        Attention:
                    </Typography>
                    <br />
                    <Typography variant="body1" component="p" className={classes.text}>
                        {warningText}
                    </Typography>
                </CardContent>
        </Card>
    );

}