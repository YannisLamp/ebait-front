import React from 'react';

import {
    ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary,
    Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));


export default function MessageList(props) {
    const { messages, userIdToNames, listType, selectedContact } = props;
    const { onClickMessage } = props;

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
                            // aria-controls="panel1a-content"
                            // id="panel1a-header"
                            >
                            <Typography className={classes.heading} style={!message.read ? { fontWeight: 'bold' } : {}}>{startLabel + nameLabel + " - " + message.subject}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    {message.message}
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





