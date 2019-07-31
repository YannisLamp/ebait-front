import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, TextField } from '@material-ui/core';

// Material icons
import { Menu, NotificationsOutlined, Input } from '@material-ui/icons/';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import useStyles from './styles';

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
              <Menu />
            </IconButton>
            <Typography variant="caption" className={classes.title}>
              EMERLD
            </Typography>
            
            <IconButton color="inherit">
              <Input/>
            </IconButton>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </div>
  );
}