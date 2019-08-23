import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { usersApi } from '../../../services';

import { connect } from 'react-redux';


// Material
import { Grid, Button, IconButton, CircularProgress, TextField, Typography, Avatar } from '@material-ui/core';

// For importing my custom styles  
import { withStyles } from '@material-ui/core';


const styles = theme => ({
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
    },
    contentBody: {
        paddingTop: theme.spacing(4),
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
    },
    textField: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: '20%'

    },
    progress: {
        display: 'block',
        marginTop: theme.spacing(2),
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    sugestion: {
        color: theme.palette.text.primary,
        marginTop: theme.spacing(2),
        textAlign: 'left'
    },
});


class EditUser extends Component {

    constructor(props) {
        super(props);

        // Get user info and copy it to state
        const { user } = this.props;
        this.state = {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            country: user.country,
            address: user.address,
            afm: user.afm,
            isLoading: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState((prevState, props) => { return { [name]: value } });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ loading: true });
        const { username, firstName, lastName, email, phoneNumber,
            country, afm } = this.state;
        //const { login } = this.props;
        //const { dispatch } = this.props;

        // na elegxw gia adeia
        if (username) {
            console.log('username and pass');
            //dispatch(loginApi.loginThunk(username, password));
        }
    }

    render() {
        const { user } = this.props;

        const { username, firstName, lastName, email, phoneNumber,
            country, address, afm } = this.state;


        const { isLoading } = this.state;

        const { classes } = this.props;


        return (
            <>
                {/* <Avatar className={classes.userLogo}>
                                {user.firstName && user.lastName ? 
                                    user.firstName.charAt(0) + user.lastName.charAt(0) 
                                :   
                                    'G'
                                }
                            </Avatar> */}



                <Typography
                    className={classes.title}
                    variant="h3"
                >
                    User Profile
                </Typography>
                <Typography
                    className={classes.sugestion}
                    variant="body1"
                >
                    with your username
                </Typography>
                {/* <form className={classes.form}> */}
                <div className={classes.content}>
                    <div className={classes.contentBody}>
                        <div className={classes.form}>
                            <Grid
                                container
                                justify="left"
                                className={classes.container}
                            >

                                {/* <Grid item xs={4}> */}
                                    <TextField
                                        className={classes.textField}
                                        label="First Name"
                                        name="firstName"
                                        value={firstName}
                                        type="text"
                                        variant="outlined"
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        className={classes.textField}
                                        label="Last Name"
                                        name="lastName"
                                        value={lastName}
                                        type="text"
                                        variant="outlined"
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        className={classes.textField}
                                        label="Email"
                                        name="email"
                                        value={email}
                                        type="text"
                                        variant="outlined"
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        className={classes.textField}
                                        label="Phone number"
                                        name="phoneNumber"
                                        value={phoneNumber}
                                        type="text"
                                        variant="outlined"
                                        onChange={this.handleChange}
                                    />

                                {/* </Grid> */}
                                </Grid>

                                <Grid
                                container
                                justify="left"
                                className={classes.container}
                                >


                                {/* <Grid item xs={4}> */}
                                    <TextField
                                        className={classes.textField}
                                        label="Country"
                                        name="country"
                                        value={country}
                                        type="text"
                                        variant="outlined"
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        className={classes.textField}
                                        label="Address"
                                        name="address"
                                        value={address}
                                        type="text"
                                        variant="outlined"
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        className={classes.textField}
                                        label="Tax Identification Number"
                                        name="afm"
                                        value={afm}
                                        type="text"
                                        variant="outlined"
                                        onChange={this.handleChange}
                                    />


                                {/* </Grid> */}





                            </Grid>
                            <Grid
                                container
                                justify="flex-end"
                                className={classes.container}
                                >
                            {isLoading ?
                                (
                                    <CircularProgress className={classes.progress} />
                                ) : (
                                    <Button
                                        className={classes.textField}
                                        color="primary"
                                        type="submit"
                                        onClick={this.handleSubmit}
                                        size="large"
                                        variant="contained"
                                    >
                                        Save Changes
                                    </Button>
                                )
                            }
                            </Grid>

                        </div>
                    </div>
                </div>
            </>
        );

    }
}


function mapStateToProps(state) {
    const { userStore } = state;
    const { user } = userStore;
    return {
        user
    };
}

const connectedEditUser = connect(mapStateToProps)(EditUser);
const styledEditUser = withStyles(styles)(connectedEditUser);
export default styledEditUser;