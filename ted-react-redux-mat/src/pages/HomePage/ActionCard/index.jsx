import React from 'react';
import { Link } from 'react-router-dom';

// Material
import { Card, CardContent, CardActions, CardActionArea, Typography } from '@material-ui/core';

// For importing my custom styles  
import useStyles from './styles';

export default function ActionCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardContent>
                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="h2">
                        be
                        nev
                        lent
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        adjective
                    </Typography>
                    <Typography variant="body2" component="p">
                        well meaning and kindly.
                                 <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {/*
                Footer? 
                <CardActions /> 
            */}
        </Card>
    );
}