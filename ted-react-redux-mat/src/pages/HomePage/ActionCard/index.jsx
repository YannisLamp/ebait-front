import React from 'react';
import { Link } from 'react-router-dom';

// Material
import { Card, CardContent, CardActions, CardActionArea, Typography } from '@material-ui/core';

// For importing my custom styles  
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        color: "white",
    },
    notDecorated: {
        textDecoration: 'none',
    },
    card: {
        color: "white",
    },
    text: {
        color: "white",
    },
    disabled: {
        pointerEvents: 'none',
        cursor: 'default',
        opacity: 0.6,
    },

}));

export default function ActionCard(props) {
    const classes = useStyles();

    const { backgroundColor, title, bodyText, disabled } = props;

    if (disabled) {
        return (
            <Card className={classes.disabled} >
                <CardActionArea  component={Link} className={classes.notDecorated}>
                    <CardContent style={{ backgroundColor: 'grey' }}>
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
                    {/* <CardActions style={{ color: 'grey' }}>
                        More ->
                    </CardActions> */}
                    
                </CardActionArea>
            </Card>
        );
    }
    else {
        return (
            <Card className={classes.card} >
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
                    {/* <CardActions style={{ color: backgroundColor }}>
                        More ->
                    </CardActions> */}
                    
                </CardActionArea> 
            </Card>
        );
    }
    
}