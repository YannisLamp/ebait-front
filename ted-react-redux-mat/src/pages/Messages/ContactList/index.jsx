import React from 'react';

import {
    List, ListItem, ListItemAvatar, Avatar,
    ListItemText, Divider, Typography
} from '@material-ui/core';
import PaperTitle from '../../../sharedComp/PaperTitle';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        //maxWidth: 360,
    },
    inline: {
        display: 'inline',
    },
}));

export default function ContactList() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <PaperTitle
                title='Contacts'
                suggestion={''}
            />
            <List>
                <ListItem alignItems="center">
                    <ListItemAvatar>
                        <Avatar>
                        {/* {user.firstName.charAt(0) + user.lastName.charAt(0)} */}
                        LALA
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary="Ali Connors"
                    //   secondary={
                    //     <React.Fragment>
                    //       <Typography
                    //         component="span"
                    //         variant="body2"
                    //         className={classes.inline}
                    //         color="textPrimary"
                    //       >
                    //         Ali Connors
                    //       </Typography>
                    //       {" — I'll be in your neighborhood doing errands this…"}
                    //     </React.Fragment>
                    //   }
                    />
                </ListItem>

                <Divider variant="inset" component="li" />

            </List>
        </div>
    );
}