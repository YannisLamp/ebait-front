import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userOperations } from '../../../store/ducks';

// Material
import { Grid, Button, IconButton, CircularProgress, TextField, Typography } from '@material-ui/core';

// For importing my custom styles  
import { withStyles } from '@material-ui/core';
import styles from './styles';

import { registerApi } from '../../../services/registerApi'


class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            usernameTaken: false,
            password: '',
            confirmPassword: '',
            passwordsMatch: true,
            firstname: '',
            lastname: '',
            email: '',
            phoneNumber: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    checkPasswordMatch() {



    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState((prevState, props) => { return { [name]: value } });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userOperations.register(this.state.username, this.state.password, 
                'firstnameyaya', 'lastnameyaya', 'emailyaya'));
        }

        const { user } = this.props;
        console.log(user);
    }

    render() {

        let userStuff = '';
        if (this.props.user) {
            const { user } = this.props;
            userStuff = user.username + ',' + user.userId + ',' + user.firstName;
        }

        const { username, password } = this.state;
        const submitted = false;

        const { classes } = this.props;

        return (
            <div className={classes.content}>
                <div className={classes.contentHeader} />
                <div className={classes.contentBody}>
                    <form className={classes.form}>
                        <Typography
                            className={classes.title}
                            variant="h2"
                        >
                            Register
            </Typography>
                        {/*<Typography
              className={classes.sugestion}
              variant="body1"
            >
              with your username
            </Typography>*/}
                        <div className={classes.fields}>
                            <TextField
                                className={classes.textField}
                                label="Username"
                                name="username"
                                type="text"
                                variant="outlined"
                                onChange={this.handleChange}
                            />
                            <TextField
                                className={classes.textField}
                                label="Password"
                                name="password"
                                type="password"
                                variant="outlined"
                                onChange={this.handleChange}
                            />
                            <TextField
                                className={classes.textField}
                                label="Confirm Password"
                                name="confirm_password"
                                type="password"
                                variant="outlined"
                            />
                            {/*<TextField
                className={classes.textField}
                label="First Name"
                name="firstName"
                type="text"
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                label="Surname"
                name="surname"
                type="text"
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                label="Email"
                name="email"
                type="email"
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                label="Phone number"
                name="phoneNumber"
                type="number"
                variant="outlined"
              />*/}

                        </div>
                        {/*isLoading ? (
                    <CircularProgress className={classes.progress} />
                  ) : (
                    <Button
                      className={classes.signInButton}
                      color="primary"
                      disabled={!isValid}
                      onClick={this.handleSignIn}
                      size="large"
                      variant="contained"
                    >
                      Sign in now
                    </Button>
                  )*/}
                        {/*<Typography
              className={classes.signUp}
              variant="body1"
            >
              Don't have an account?{' '}
              <Link
                className={classes.signUpUrl}
                to="/sign-up"
              >
                Sign up
              </Link>
            </Typography>*/}
                        <Button
                            className={classes.signInButton}
                            color="primary"
                            onClick={this.handleSubmit}
                            size="large"
                            variant="contained"
                        >
                            Register
                    </Button>
                        {userStuff}
                    </form>
                </div>
            </div>
        )

    }
}



function mapStateToProps(state) {
    const { currentUser } = state;
    const { user } = currentUser;
    return {
        user
    };
}

/*function mapDispatchToProps(dispatch) {
  return {
    login: (username, password) => dispatch(authOperations.login(username, password))
  };
}*/


const styledRegisterForm = withStyles(styles)(RegisterForm);
const connectedRegisterForm = connect(mapStateToProps)(styledRegisterForm);
export default connectedRegisterForm;