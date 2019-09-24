import React from 'react';

import { TextField, Button, Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        minHeight: '60vh',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    grid: {
        minHeight: '60vh',
    },
    messageInput: {
        marginTop: theme.spacing(6),
    },
    sendButton: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
}));


export default function MessageList(props) {
    const { selectedContact, messageSubject, message } = props;
    const { handleChange, sendMessage } = props;

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid
                className={classes.grid}
                container
                direction="column"
                justify="space-between"
            >

                <Grid container item direction="column">
                    <Grid item>
                        <TextField
                            label="To:"
                            style={{ margin: 8 }}
                            placeholder={!selectedContact ? 'Please select a contact' : ' '}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                readOnly: true,
                            }}
                            value={selectedContact ? selectedContact.firstName + " " + selectedContact.lastName : ''}
                            error={!selectedContact}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            name="messageSubject"
                            label="Subject:"
                            style={{ margin: 8 }}
                            margin="normal"
                            value={messageSubject}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>

                <Grid item>
                    <TextField
                        name="message"
                        label="Message"
                        multiline
                        rows="6"
                        fullWidth
                        className={classes.messageInput}
                        variant="outlined"
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={message}
                        onChange={handleChange}
                    />

                    <Button
                        className={classes.sendButton}
                        color="primary"
                        type="submit"
                        fullWidth
                        onClick={sendMessage}
                        disabled={ !selectedContact || messageSubject === ''}
                        //size="large"
                        variant="contained"
                    >
                        Send
                    </Button>
                </Grid>

            </Grid>
        </div>
    );
}





