import React from 'react';

import {
    ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary,
    Typography, IconButton, Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';

import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    deleteBtn: {
        color: 'rgb(220, 0, 78)',
    },
}));


export default function MessageList(props) {
    const { messages, userIdToNames, listType, selectedContact } = props;
    const { onClickMessage, deleteMessage } = props;

    const startLabel = listType === "inbox" ? "From: " : "To: ";

    const classes = useStyles;
    return (
        <div className={classes.root}>
            {messages.map(message => {
                const displayId = listType === "inbox" ? message.senderUserId : message.receiverUserId;
                if (!selectedContact || displayId === selectedContact.userId) {

                    const nameLabel = userIdToNames[displayId];

                    return (
                        <ExpansionPanel key={message.id}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                onClick={e => { if (!message.read) { onClickMessage(message.id) } }}
                            >
                                <Typography className={classes.heading} style={!message.read ? { fontWeight: 'bold' } : {}}>
                                    {startLabel + nameLabel + " - " + message.subject}
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    <Grid container justify="space-between">
                                        <Grid item>
                                            {message.message}
                                        </Grid>

                                        <Grid item>
                                            <IconButton className={classes.deleteBtn} onClick={e => deleteMessage(message.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    );
                }
            })
            }
        </div>
    );
}





