import React from 'react';

// Material
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@material-ui/core';

// For importing my custom styles  
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({

}));

export default function ContactListItem(props) {
    const classes = useStyles();

    const { backgroundColor, title, bodyText, disabled } = props;

    return (
        <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
        </ListItem>
    );
}


