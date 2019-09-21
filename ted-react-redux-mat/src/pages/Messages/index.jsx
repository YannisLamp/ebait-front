import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';

import { Grid, Paper, AppBar, Tabs, Tab, Box, Typography } from '@material-ui/core';
import { withStyles, withTheme } from '@material-ui/core';
import { pageStyles } from '../pageStyles';

import { connect } from 'react-redux';

import PaperTitle from '../../sharedComp/PaperTitle';
import MessageList from './MessageList';
import ContactList from './ContactList';

import { messageApi } from '../../services';


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
        //contacts: [],
        //isLoadingContacts: false,
        //selectedContact: null, 

        tabValue: 0,
    };

    componentDidMount = () => {
        this.getContacts();
    }


    getContacts = () => {
        // Start Loading
        this.setState((prevState, props) => {
            return { isLoadingContacts: true }
        })

        messageApi.getAllContacts()
            .then(data => {
                if (data) {
                    this.setState((prevState, props) => {
                        return {
                            contacts: data,
                            isLoading: false,
                            selectedContact: data.length > 0 ? data[0] : null 
                        }
                    })
                }
            });
    }

    // handleRequestSort(event, property) {
    //     this.setState((prevState, props) => {
    //         const { order, orderBy, pageSize } = prevState;
    //         const isDesc = orderBy === property && order === 'desc';
    //         const newOrder = isDesc ? 'asc' : 'desc';

    //         // Also alters State and needs to know the new state
    //         this.queryTableData(property, newOrder, pageSize, 0);
    //         return {
    //             order: newOrder,
    //             orderBy: property,
    //             currPage: 0,
    //         }
    //     });
    // }

    // handleChangePage(event, newPage) {
    //     this.setState((prevState, props) => {
    //         const { order, orderBy, pageSize } = prevState;

    //         this.queryTableData(orderBy, order, pageSize, newPage);
    //         return {
    //             currPage: newPage
    //         }
    //     });
    // }

    // handleChangeRowsPerPage(event) {
    //     this.setState((prevState, props) => {
    //         const { order, orderBy } = prevState;
    //         const newPageSize = +event.target.value;

    //         this.queryTableData(orderBy, order, newPageSize, 0);
    //         return {
    //             currPage: 0,
    //             pageSize: newPageSize,
    //         }
    //     });

    // }

    // verifyUser() {
    //     const { userId } = this.state.userToVerify;
    //     this.setState((prevState, props) => { return { isVerifying: true } });
    //     usersApi.verifyUser(userId)
    //         .then(data => {
    //             const { order, orderBy, currPage, pageSize } = this.state;
    //             this.queryTableData(orderBy, order, pageSize, currPage);
    //             this.setState((prevState, props) => { return { isVerifying: false } });
    //         });
    // }

    // changeUser(user) {
    //     this.setState((prevState, props) => { return { userToVerify: user } });
    // }

    handleChangeTab = (e, newValue) => {
        this.setState((prevState, props) => { return { tabValue: newValue } });
    }

    handleChangeTabIndex = (newValue) => {
        this.setState((prevState, props) => { return { tabValue: newValue } });
    }

    handleChangeSelectedContact = (index) => { 
        this.setState((prevState, props) => { return { selectedContact: prevState.contacts[index] } });
    } 

    render() {
        const { tabValue } = this.state;
        const { contacts, selectedContact } = this.props;

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
                                        aria-label="full width tabs example"
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
                                        Item Three
                                        </TabPanel>
                                </SwipeableViews>

                                {/* <MessageList /> */}
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
    } = messageStore;
    return {
        contacts, 
        selectedContact,
        isLoadingContacts
    };
}

const connectedMessages = connect(mapStateToProps)(Messages);
const styledMessages = withStyles(styles)(connectedMessages);
const themedMessages = withTheme(styledMessages);
export default themedMessages;