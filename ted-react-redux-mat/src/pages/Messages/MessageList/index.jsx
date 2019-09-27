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

    const classes = useStyles();
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
                                onClick={e => { if (!message.read && listType === "inbox") { onClickMessage(message.id) } }}
                            >
                                <Typography className={classes.heading} style={!message.read && listType === "inbox" ? { fontWeight: 'bold' } : {}}>
                                    {startLabel + nameLabel + " - " + message.subject}
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid container justify="space-between">
                                    <Grid item sm={11}>
                                        <Typography>
                                            {message.message}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={1}>
                                        <IconButton className={classes.deleteBtn} onClick={e => deleteMessage(message.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    );
                }
                else {
                    return "";
                }
            })
            }
        </div>
    );
}





