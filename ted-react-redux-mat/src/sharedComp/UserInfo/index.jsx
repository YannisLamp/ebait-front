import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { usersApi } from '../../services';

// Material
import { Grid, Button, IconButton, CircularProgress, TextField, Typography, Avatar } from '@material-ui/core';

// For importing my custom styles  
import { withStyles } from '@material-ui/core';
import styles from './styles';

class UserInfo extends Component {

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
            afm: user.afm
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
        
        
        const { loading } = this.state;
        const submitted = false;

        const { classes } = this.props;

        const { edit } = this.props;

        
        return (

            <>
            {/* <Avatar className={classes.userLogo}>
                                {user.firstName && user.lastName ? 
                                    user.firstName.charAt(0) + user.lastName.charAt(0) 
                                :   
                                    'G'
                                }
                            </Avatar> */}


            <form className={classes.form}>
                <Typography
                    className={classes.title}
                    variant="h3"
                >
                    User Profile
                </Typography>
                        
                    <Grid 
                        container
                        justify="center"
                        className={classes.container}
                    >

                        <Grid item xs={4}>
                        <TextField
                className={classes.textField}
                label="First Name"
                name="firstName"
                value={firstName}
                type="text"
                variant="outlined"
                onChange={this.handleChange}
                InputProps={{
                    readOnly: !edit,
                }}
            />
            <TextField
                className={classes.textField}
                label="Last Name"
                name="lastName"
                value={lastName}
                type="text"
                variant="outlined"
                onChange={this.handleChange}
                InputProps={{
                    readOnly: !edit,
                }}
            />
            <TextField
                className={classes.textField}
                label="Email"
                name="email"
                value={email}
                type="text"
                variant="outlined"
                onChange={this.handleChange}
                InputProps={{
                    readOnly: !edit,
                }}
            />
            <TextField
                className={classes.textField}
                label="Phone number"
                name="phoneNumber"
                value={phoneNumber}
                type="number"
                variant="outlined"
                onChange={this.handleChange}
                InputProps={{
                    readOnly: !edit,
                }}
            />


                        </Grid>


                        <Grid item xs={4}>
                            <TextField
                                className={classes.textField}
                                    label="Username"
                                    value={username}
                                    name="username"
                                    type="text"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    InputProps={{
                                        readOnly: !edit,
                                    }}
                                />

                             {/* <Grid item xs={4}>
                            <TextField
                                className={classes.textField}
                                label="Password"
                                name="password"
                                type="password"
                                variant="outlined"
                                onChange={this.handleChange}
                                InputProps={{
                                    readOnly: !edit,
                                }}
                            />
                            </Grid> */}

                        </Grid>


                        <Grid item xs={4}>
                        <TextField
                className={classes.textField}
                label="Country"
                name="country"
                value={country}
                type="text"
                variant="outlined"
                onChange={this.handleChange}
                InputProps={{
                    readOnly: !edit,
                }}
            />
            <TextField
                className={classes.textField}
                label="Address"
                name="address"
                value={address}
                type="text"
                variant="outlined"
                onChange={this.handleChange}
                InputProps={{
                    readOnly: !edit,
                }}
            />
            <TextField
                className={classes.textField}
                label="Tax Identification Number"
                name="afm"
                value={afm}
                type="text"
                variant="outlined"
                onChange={this.handleChange}
                InputProps={{
                    readOnly: !edit,
                }}
            />


                        </Grid>
                            
                           

                            
                        
</Grid>

            </form>
            </>
        );
        
    }
}



const styledUserInfo = withStyles(styles)(UserInfo);
export default styledUserInfo;