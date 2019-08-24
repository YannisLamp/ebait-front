import React, { Component } from 'react';
import { usersApi } from '../../../services';

import { connect } from 'react-redux';

// Material
import { Grid, Button, CircularProgress, TextField, Typography, Divider } from '@material-ui/core';

import PaperTitle from '../../../sharedComp/PaperTitle';

// For importing my custom styles  
import { withStyles } from '@material-ui/core';


const styles = theme => ({
    root: {
        height: 'inherit',
        width: '100%',

    },
    description: {
        paddingTop: theme.spacing(4),
    },
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(4),
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
            infoLoading: false,

            oldPassword: null,
            password: null,
            confirmPassword: null,
            passLoading: false,
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
        const { firstName, lastName, email, phoneNumber, country, address,
            afm, oldPassword, password, confirmPassword } = this.state;
        const { infoLoading, passLoading } = this.state;


        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <PaperTitle
                    title='User Profile'
                    suggestion='edit your profile info'
                />



                <Grid
                    container
                    direction="column"
                    justify="space-between"
                >

                    <Grid
                        item
                    >




                        <Grid
                            container
                            justify="flex-start"
                            className={classes.container}
                        >
                            <Typography
                                //className={classes.description}
                                variant="body1"
                            >
                                basic user information
                    </Typography>



                            <Grid item xs={12} className={classes.accountBasic}>
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

                            </Grid>

                        </Grid>

                        {/* <Divider className={classes.divider} /> */}




                        <Grid
                            container
                            justify="left"
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


                    </Grid>


                    <Grid item>

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
                        {passLoading ?
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
                                    Change Password
                        </Button>
                            )
                        }







                    </Grid>



                </Grid>



            </div>

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