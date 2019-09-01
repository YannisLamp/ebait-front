import React from 'react';
// Material
import { Typography } from '@material-ui/core';

// For importing my custom styles  
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  quote: {
    //backgroundColor: theme.palette.background.default,
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  welcomeText: {
    fontSize: '50px',
    color: theme.palette.primary.main,
    fontWeight: 400,
    marginBottom: theme.spacing(10),
  },
  quoteText: {
    color: theme.palette.primary.main,
    fontWeight: 300
  },
}));

export default function LoginQuote(props) {
  
    const classes = useStyles();
  return (
      <div className={classes.quote}>
        <div className={classes.quoteInner}>
          <Typography
              className={classes.welcomeText}
          >
            Welcome to eBait
          </Typography>
          <Typography
            className={classes.quoteText}
            variant="h1"
          > 
            Sell your stuff. Make money.
            <br/>
            Buy new stuff. Your life's better now.
          </Typography>
        </div>
      </div>
  );
}