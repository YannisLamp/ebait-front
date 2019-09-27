import React from 'react';

import {
    List, ListItem, ListItemAvatar, Avatar,
    ListItemText, Divider,
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
    listItem: {
        cursor: 'pointer',
        '&:hover': {
            //backgroundColor: theme.palette.primary.light,
            //borderLeft: `4px solid ${theme.palette.primary.main}`,
            //borderRadius: '4px',
            '& $listItemIcon': {
                color: theme.palette.secondary.light,
                //marginLeft: '-4px'
            },
            '& $listItemText': {
                color: theme.palette.text.secondary,
            },
        },
        '& + &': {
            marginTop: theme.spacing(1)
        }
    },
    activeListItem: {
        //borderLeft: `4px solid ${theme.palette.primary.secondary}`,
        //borderRadius: '4px',
        backgroundColor: theme.palette.primary.main,
        '& $listItemIcon': {
            color: theme.palette.secondary.main,
            //marginLeft: '-4px'
        },
        '& $listItemText': {
            color: theme.palette.text.secondary
        },

    },
}));

export default function ContactList(props) {
    const { contacts, selectedContact } = props;

    const { handleChangeSelectedContact, handleChangeSelectedContactAll } = props;

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <PaperTitle
                title='Contacts'
                suggestion={''}
            />
            <List>
                <ListItem
                    className={classes.listItem}
                    //activeClassName={classes.activeListItem}
                    selected={!selectedContact}
                    onClick={handleChangeSelectedContactAll}
                    alignItems="center"
                >
                    {/* <ListItemAvatar>
                        <Avatar>
                            {contact.firstName.charAt(0) + contact.lastName.charAt(0)}
                        </Avatar>
                    </ListItemAvatar> */}
                    <ListItemText
                        primary={"All"}
                    />
                </ListItem>
                {
                    contacts.map((contact, index) => {
                        return (
                            <div key={index}>
                                <ListItem
                                    className={classes.listItem}
                                    //activeClassName={classes.activeListItem}
                                    selected={selectedContact && contact.userId === selectedContact.userId}
                                    onClick={event => handleChangeSelectedContact(index)}
                                    alignItems="center"
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            {contact.firstName.charAt(0) + contact.lastName.charAt(0)}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={contact.firstName + " " + contact.lastName}
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
                            </div>
                        );
                    })
                }

            </List>
        </div>
    );
}