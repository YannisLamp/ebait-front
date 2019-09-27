import React from 'react';
import { Link } from 'react-router-dom';

// Material
import { Card, CardContent, CardActionArea, Typography } from '@material-ui/core';

// For importing my custom styles  
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    notDecorated: {
        textDecoration: 'none',
    },
    card: {
        height: '100%',
        color: "white",
        backgroundColor: theme.palette.primary.dark,
    },
    text: {
        color: "white",
    },
    disabled: {
        height: '100%',
        backgroundColor: 'grey',
        pointerEvents: 'none',
        cursor: 'default',
        opacity: 0.6,
    },

}));

export default function ActionCard(props) {
    const classes = useStyles();

    //const { backgroundColor, title, bodyText, disabled } = props;
    const { title, bodyText, disabled } = props;

    if (disabled) {
        return (
            <Card 
                className={classes.disabled} 
            >
                <CardActionArea className={classes.notDecorated}>
                    <CardContent >
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
                    
                </CardActionArea>
            </Card>
        );
    }
    else {
        return (
            <Card 
                className={classes.card} 
                //style={{ backgroundColor }}
            >
                <CardActionArea component={Link} to={props.to} className={classes.notDecorated}>
                    <CardContent>
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