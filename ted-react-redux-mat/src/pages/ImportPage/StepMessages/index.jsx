import React from 'react';

// Material
import { Typography } from '@material-ui/core';

// For importing my custom styles  
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({


}));

export default function WarningMsg(props) {
    const { step } = props;

    
    const classes = useStyles();
    return (
        
        <Typography variant="body2" color="textPrimary" component="p">
            {lastCategory}
        </Typography>
    );

}