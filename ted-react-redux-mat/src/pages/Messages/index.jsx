import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';

import { Grid, Paper, AppBar, Tabs, Tab, Box, Typography } from '@material-ui/core';
import { withStyles, withTheme } from '@material-ui/core';
import { pageStyles } from '../pageStyles';

import { connect } from 'react-redux';

import PaperTitle from '../../sharedComp/PaperTitle';
import MessageList from './MessageList';
import ContactList from './ContactList';
import CreateMessage from './CreateMessage';

import { messageApi } from '../../services';
import { messageActions } from '../../store/ducks';


const styles = theme => ({
    ...pageStyles(theme),
    paper: {
        width: '100%',
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        marginBottom: theme.spacing(2),
        height: '80vh',
    },
    leftPaper: {
        width: '100%',
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        marginBottom: theme.spacing(1),
        minHeight: '80vh',
        //height: '75vh',
    },
    leftWrapper: {
        marginTop: theme.spacing(12),
        marginRight: theme.spacing(10),
    },
    rightWrapper: {
        marginTop: theme.spacing(12),
        marginRight: theme.spacing(4),
    },
    tabBar: {
        marginTop: theme.spacing(1),
    },
    tabLabel: {
        color: theme.palette.text.primary,
    }
});


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

class Messages extends Component {

    state = {
        messageSubject: '',
        message: '',
    };

    componentDidMount = () => {
        //this.getContacts();
    }


    // getContacts = () => {
    //     // Start Loading
    //     this.setState((prevState, props) => {
    //         return { isLoadingContacts: true }
    //     })

    //     messageApi.getAllContacts()
    //         .then(data => {
    //             if (data) {
    //                 this.setState((prevState, props) => {
    //                     return {
    //                         contacts: data,
    //                         isLoading: false,
    //                         selectedContact: data.length > 0 ? data[0] : null 
    //                     }
    //                 })
    //             }
    //         });
    // }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState, props) => { return { [name]: value } });
    }

    handleChangeTab = (e, newValue) => {
        const { dispatch } = this.props;
        dispatch(messageActions.selectTab(newValue));
    }

    handleChangeTabIndex = (newValue) => {
        const { dispatch } = this.props;
        dispatch(messageActions.selectTab(newValue));
    }

    handleChangeSelectedContact = (index) => { 
        const { dispatch, contacts } = this.props;
        dispatch(messageActions.selectContact(contacts[index]));
    }

    sendMessage = () => {
        const { messageSubject, message } = this.state;
        const sendId = this.props.selectedContact.userId;

        messageApi.sendMessage(sendId, messageSubject, message);

        this.setState((prevState, props) => { return { messageSubject: '', message: '' } });
    }

    render() {
        const { contacts, selectedContact, tabValue } = this.props;

        const { classes, theme } = this.props;
        return (
            <div className={classes.root}>
                <Grid
                    className={classes.grid}
                    container
                    //alignItems="center"
                    justify="center"
                >
                    <Grid
                        className={classes.leftWrapper}
                        item
                        lg={2}
                    >
                        <Paper className={classes.leftPaper}>
                            <ContactList 
                                contacts={contacts} 
                                selectedContact={selectedContact} 
                                
                                handleChangeSelectedContact={this.handleChangeSelectedContact}    
                            />
                        </Paper>
                    </Grid>


                    <Grid
                        className={classes.rightWrapper}
                        item
                        lg={8}
                    >

                        <Grid
                            style={{ height: '100%' }}
                            container
                            direction="column"
                            justify="flex-start"
                        >

                            <Paper className={classes.paper}>
                                <PaperTitle
                                    title='Messages'
                                    suggestion={''}
                                />
                                <AppBar className={classes.tabBar} position="static" color="default">
                                    <Tabs
                                        value={tabValue}
                                        onChange={this.handleChangeTab}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        //variant="fullWidth"
                                        centered
                                    >
                                        <Tab className={classes.tabLabel} label="Inbox" {...a11yProps(0)} />
                                        <Tab className={classes.tabLabel} label="Sent" {...a11yProps(1)} />
                                        <Tab className={classes.tabLabel} label="Create Message" {...a11yProps(2)} />
                                    </Tabs>
                                </AppBar>
                                <SwipeableViews
                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={tabValue}
                                    onChangeIndex={this.handleChangeTabIndex}
                                >
                                    <TabPanel value={tabValue} index={0} dir={theme.direction}>
                                        <MessageList />
                                    </TabPanel>
                                    <TabPanel value={tabValue} index={1} dir={theme.direction}>
                                        <MessageList />
                                    </TabPanel>
                                    <TabPanel value={tabValue} index={2} dir={theme.direction}>
                                        <CreateMessage 
                                            selectedContact={selectedContact}

                                            handleChange={this.handleChange}
                                            sendMessage={this.sendMessage}
                                        />
                                    </TabPanel>
                                </SwipeableViews>

                            </Paper>

                        </Grid>

                    </Grid>


                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { messageStore } = state;
    const { 
        contacts, 
        selectedContact,
        isLoadingContacts,
        tabValue,     
    } = messageStore;
    return {
        contacts, 
        selectedContact,
        isLoadingContacts,
        tabValue,
    };
}

const connectedMessages = connect(mapStateToProps)(Messages);
const styledMessages = withStyles(styles)(connectedMessages);
const themedMessages = withTheme(styledMessages);
export default themedMessages;