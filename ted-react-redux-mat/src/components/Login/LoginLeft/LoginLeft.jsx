import React from 'react';
// Material
import { Typography } from '@material-ui/core';
// For importing my custom styles  
import { withStyles } from '@material-ui/core';
import styles from './styles';

function LoginLeft(props) {
  const { classes } = props;

  return (
      <div className={classes.quote}>
        <div className={classes.quoteInner}>
          <Typography
            className={classes.quoteText}
            variant="h1"
          >
            Welcome
            <br/>
            <br/>
            Buy and sell your stuff.
          </Typography>
        </div>
      </div>
  );
}


const styledLoginLeft = withStyles(styles)(LoginLeft);
export { styledLoginLeft as LoginLeft };