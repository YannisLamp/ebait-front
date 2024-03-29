import React, { Component } from 'react';
import { usersApi } from '../../../services';
import { loginApi } from '../../../services';

import { connect } from 'react-redux';
import { alertActions } from '../../../store/ducks/alertStore';

import { Grid, Button, CircularProgress, TextField, Typography } from '@material-ui/core';

import PaperTitle from '../../../sharedComp/PaperTitle';

import { withStyles } from '@material-ui/core';


const styles = theme => ({
    description: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(1),
    },
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(4),
    },
    textField: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: theme.spacing(30)
    },
    button: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: theme.spacing(26),
    },
    bottomButton: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: theme.spacing(26),
    },
    progress: {
        //display: 'block',
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(12),
    },

});


class EditUser extends Component {

    constructor(props) {
        super(props);

        // Get user info and copy it to state
        const { user } = this.props;
        this.state = {
            userId: user.userId,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            country: user.country,
            address: user.address,
            afm: user.afm,
            infoLoading: false,

            oldPassword: '',
            password: '',
            confirmPassword: '',
            passLoading: false,
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState, props) => { return { [name]: value } });
    }

    handleEditUser = () => {
        this.setState((prevState, props) => { return { infoLoading: true } });
        const { userId, firstName, lastName, email, phoneNumber, country, address, afm } = this.state;
        const { dispatch } = this.props;
        
        if (firstName !== "" && firstName.length > 1 && lastName !== "" && lastName.length > 1 &&
            email !== "" && email.includes("@") && country !== "" && address !== "") {
        usersApi.editUserInfo(userId, firstName, lastName, email, phoneNumber, country, address, afm)
            .then(response => {
                this.setState((prevState, props) => { return { infoLoading: false } });
                dispatch(loginApi.refreshUserThunk(userId));
            })
        }
        else {
            dispatch(alertActions.error("Personal Information must not be null, user email must contain an @"));
            this.setState((prevState, props) => { return { infoLoading: false } });
        }

    }

    handleChangePassword = () => {
        this.setState((prevState, props) => { return { passLoading: true } });
        const { oldPassword, password, confirmPassword } = this.state;
        const { dispatch } = this.props;
        
        // Password check
        if (oldPassword !== "" && confirmPassword !== "" && password === confirmPassword && password.length >= 8) {
            usersApi.changeUserPassword(oldPassword, password)
                .then(response => {
                    this.setState((prevState, props) => { return { passLoading: false } });
                })
        }
        else {
            dispatch(alertActions.error("Please provide valid passwords, with more than 8 characters"));
            this.setState((prevState, props) => { return { passLoading: false } });
        }
    }

    render() {
        const { firstName, lastName, email, phoneNumber, country, address,
            afm, oldPassword, password, confirmPassword } = this.state;
        const { infoLoading, passLoading } = this.state;


        const { classes } = this.props;
        return (
            <>
                <PaperTitle
                    title='User Profile'
                    suggestion='edit your profile info'
                />

                <Grid
                    container
                    justify="flex-start"
                    className={classes.container}
                >
                    <Typography
                        className={classes.description}
                        variant="body1"
                    >
                        basic user information
                        </Typography>



                    <Grid item xs={12}>
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
                            label="Tax Identification Number"
                            name="afm"
                            value={afm}
                            type="text"
                            variant="outlined"
                            onChange={this.handleChange}
                        />

                    </Grid>




                </Grid>

                {/* <Divider className={classes.divider} /> */}

                <Grid
                    container
                    justify="flex-start"
                    className={classes.container}
                >
                    <Typography
                        className={classes.description}
                        variant="body1"
                    >
                        user contact information
                        </Typography>



                    <Grid item xs={12} className={classes.accountBasic}>
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

                    </Grid>

                </Grid>


                <Grid
                    container
                    justify="flex-start"
                    className={classes.container}
                >

                    <Typography
                        className={classes.description}
                        variant="body1"
                    >
                        user location information
                    </Typography>

                    <Grid item xs={12}>



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


                    </Grid>


                </Grid>


                <Grid
                    container
                    justify="flex-end"
                    className={classes.container}
                >
                    {infoLoading ?
                        (
                            <CircularProgress className={classes.progress} />
                        ) : (
                            <Button
                                className={classes.button}
                                color="primary"
                                type="submit"
                                onClick={this.handleEditUser}
                                size="large"
                                variant="contained"
                            >
                                Save Changes
                                </Button>
                        )
                    }
                </Grid>



                <Typography
                    className={classes.description}
                    variant="body1"
                >
                    change user password
                    </Typography>

                <TextField
                    className={classes.textField}
                    label="Old Password"
                    name="oldPassword"
                    value={oldPassword}
                    type="password"
                    variant="outlined"
                    onChange={this.handleChange}
                />
                <TextField
                    className={classes.textField}
                    label="Password"
                    name="password"
                    value={password}
                    type="password"
                    variant="outlined"
                    onChange={this.handleChange}
                />
                <TextField
                    className={classes.textField}
                    label="Confirm Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    type="password"
                    variant="outlined"
                    onChange={this.handleChange}
                />



                <Grid
                    container
                    justify="flex-end"
                    className={classes.container}
                >

                    {passLoading ?
                        (
                            <CircularProgress className={classes.progress} />
                        ) : (
                            <Button
                                className={classes.bottomButton}
                                color="primary"
                                type="submit"
                                onClick={this.handleChangePassword}
                                size="large"
                                variant="contained"
                            >
                                Change Password
                            </Button>
                        )
                    }

                </Grid>
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