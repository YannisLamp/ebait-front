import React from 'react';
import { Link } from 'react-router-dom';

// Material
import { Card, CardContent, CardActions, CardActionArea, Typography } from '@material-ui/core';

// For importing my custom styles  
import useStyles from './styles';

export default function ActionCard(props) {
    const classes = useStyles();

    const { backgroundColor, title, bodyText } = props;

    return (
        <Card className={classes.card}>
            <CardActionArea component={Link} to={props.to} className={classes.notDecorated}>
                <CardContent style={{ backgroundColor }}>
                    {/* <Typography className={classes.title} color="textPrimary" gutterBottom>
                        Word of the Day
                    </Typography> */}
                    <Typography variant="h5" component="h2" className={classes.text}>
                        {title}
                    </Typography>
                    <br />
                    <br />
                    <br />
                    <Typography variant="body1" component="p" className={classes.text}>
                        {bodyText}
                        
                    </Typography>
                </CardContent>

                
                {/* Footer?  */}
                <CardActions style={{ color: backgroundColor }}>
                    More ->
                </CardActions>
                
            </CardActionArea> 
           
        </Card>
    );
}