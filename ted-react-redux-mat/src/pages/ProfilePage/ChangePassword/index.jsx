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
        paddingTop: theme.spacing(14),
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center'
        },
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justify: 'center',
        marginTop: theme.spacing(4),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
});


class ChangePassword extends Component {

    constructor(props) {
        super(props);

        // Get user info and copy it to state
        this.state = { 
            oldPassword: '',
            password: '',
            confirmPassword: ''
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
        const { oldPassword, password, confirmPassword } = this.state;
        
        
        const { loading } = this.state;
        const submitted = false;

        const { classes } = this.props;

        
        return (

            <>
                <Typography
                    className={classes.title}
                    variant="h3"
                >
                    Change Password
                </Typography>
            <form className={classes.container}>
                
                        
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

            </form>
            </>
        );
        
    }
}

const styledChangePassword = withStyles(styles)(ChangePassword);
export default styledChangePassword;