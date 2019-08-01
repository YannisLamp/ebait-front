import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userOperations } from '../../../store/ducks';

// Material
import { Grid, Button, IconButton, CircularProgress, TextField, Typography } from '@material-ui/core';

// For importing my custom styles  
import { withStyles } from '@material-ui/core';
import styles from './styles';

import CredentialForm from './CredentialForm';
import BasicInfoForm from './BasicInfoForm';


//{/*helperText={!passwordsMatch ? "Passwords should match" : " "}*/}
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
            phoneNumber: null,
            afm: null,
            currentStep: 1,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.checkPasswordMatch = this.checkPasswordMatch.bind(this);

        this.prevStep = this.prevStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }



    handleChange(e) {
        const { name, value } = e.target;
        this.setState((prevState, props) => { return { [name]: value } });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, firstName, lastName, email } = this.state;
        const { dispatch } = this.props;
        if (username && password && firstName && lastName && email) {
            dispatch(userOperations.register(username, password, firstName, 
                lastName, email));
        }

        const { user } = this.props;
        console.log(user);
    }

    checkPasswordMatch() {
        this.setState((prevState, props) => { return { 'passwordsMatch': prevState.password === prevState.confirmPassword } });
    }

    prevStep() {
        this.setState((prevState, props) => { return { 'currentStep': prevState.currentStep - 1 } });
    }
        
    nextStep() {
        this.setState((prevState, props) => { return { 'currentStep': prevState.currentStep + 1 } });
    }


    //Step


    render() {

        let userStuff = '';
        if (this.props.user) {
            const { user } = this.props;
            userStuff = user.username + ',' + user.userId + ',' + user.firstName;
        }

        const { passwordsMatch, currentStep } = this.state;
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
                        <Typography
                            className={classes.sugestion}
                            variant="h5"
                        >
                            Step {currentStep}:
                        </Typography>

                        
                        
                        { (currentStep === 1) ? (
                            < CredentialForm 
                                handleChange={this.handleChange} 
                                checkPasswordMatch={this.checkPasswordMatch}  
                                passwordsMatch={this.state.passwordsMatch}  
                            />
                        ) : (
                            < BasicInfoForm 
                                handleChange={this.handleChange} 
                            />
                        )}

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
                        
                        <div className={classes.progressButtons}>
                            <Button
                                className={classes.back}
                                onClick={this.prevStep}
                                size="large"
                                variant="contained"
                                disabled={(currentStep === 1)}
                            >
                                Back
                            </Button>
                            { (currentStep === 2) ? (
                                <Button
                                className={classes.signUpButton}
                                color="primary"
                                onClick={this.handleSubmit}
                                size="large"
                                variant="contained"
                                >
                                    Register
                                </Button>
                            )
                            : (
                                <Button
                                    className={classes.next}
                                    onClick={this.nextStep}
                                    size="large"
                                    variant="contained"
                                    disabled={!passwordsMatch}
                                >
                                    Next
                                </Button>
                            )}
                            

                        </div>
                        {this.passwordsMatch}, {this.password}
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