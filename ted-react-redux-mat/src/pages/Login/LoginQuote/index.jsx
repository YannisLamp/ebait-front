import React from 'react';
// Material
import { Typography } from '@material-ui/core';

// For importing my custom styles  
import useStyles from './styles';

export default function LoginQuote(props) {
  
    const classes = useStyles();
  return (
      <div className={classes.quote}>
        <div className={classes.quoteInner}>
          <Typography
              className={classes.welcomeText}
          >
            Welcome to Emerld
          </Typography>
          <Typography
            className={classes.quoteText}
            variant="h1"
          > 
            Buy and sell your stuff.
          </Typography>
        </div>
      </div>
  );
}