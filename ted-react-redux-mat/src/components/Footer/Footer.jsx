import React, { Component } from 'react';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Divider, Typography } from '@material-ui/core';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  company: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 0.5
  }
});

class Footer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className='foot'>
        <Divider />
        <Typography
          className={classes.company}
          variant="body1"
        >
          &copy; Di
        </Typography>
        <Typography variant="subtitle2">
          iHamod koita arxige
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Footer);
