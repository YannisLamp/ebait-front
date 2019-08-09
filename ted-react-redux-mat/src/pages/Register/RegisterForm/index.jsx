import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { history } from '../../../utils';
import { connect } from 'react-redux';
import { registerApi } from '../../../services';

// Material
import { IconButton, CircularProgress, TextField, Typography } from '@material-ui/core';

// For importing my custom styles  
import { withStyles } from '@material-ui/core';
import styles from './styles';

import CredentialForm from './CredentialForm';
import BasicInfoForm from './BasicInfoForm';
import LocationForm from './LocationForm';

import ProgressButtons from './ProgressButtons';


class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            usernameTaken: false,
            password: '',
            confirmPassword: '',
            passwordsMatch: true,
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            country: '',
            address: '',
            afm: '',
            currentStep: 1,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
        this.checkUsernameExists = this.checkUsernameExists.bind(this);

        this.prevStep = this.prevStep.bind(this);
        this.nextStep = this.nextStep.bind(this);

        this.redirectToLogin = this.redirectToLogin.bind(this);

    }



    handleChange(e) {
        const { name, value } = e.target;
        this.setState((prevState, props) => { return { [name]: value } });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, firstName, lastName, email, phoneNumber,
            country, address, afm} = this.state;
        const { dispatch } = this.props;

        // Check validity 
        if (username && password && firstName && lastName && email && phoneNumber && 
                country && address && afm) {
            dispatch(registerApi.registerThunk(username, password, firstName, 
                lastName, email, phoneNumber, country, address, afm));
        }

        const { user } = this.props;
        console.log(user);
    }


    checkPasswordMatch() {
        this.setState((prevState, props) => { 
            return { 'passwordsMatch': prevState.password === prevState.confirmPassword } 
        });
    }

    checkUsernameExists() {
        registerApi.checkUsernameExists(this.state.username)
            .then(data => {
                let taken = data.exists;
                this.setState((prevState, props) => { return { 'usernameTaken': taken } });
            }
            );
    }

    prevStep() {
        this.setState((prevState, props) => { 
            return { 'currentStep': prevState.currentStep - 1 } 
        });
    }
        
    nextStep() {
        this.setState((prevState, props) => {
            return { 'currentStep': prevState.currentStep + 1 } 
        });
    }

    redirectToLogin() {
        history.push('/login');
    }

    render() {

        let userStuff = '';
        if (this.props.user) {
            const { user } = this.props;
            userStuff = user.username + ',' + user.userId + ',' + user.firstName;
        }

        
        const { passwordsMatch, currentStep, usernameTaken } = this.state;
        const submitted = false;

        const { classes } = this.props;

        function formForStep(step, comp) {
            if (step === 1) {
                const { username, password, confirmPassword } = comp.state;
                return (
                    < CredentialForm 
                        handleChange={comp.handleChange} 
                        checkPasswordMatch={comp.checkPasswordMatch}  
                        checkUsernameExists={comp.checkUsernameExists}

                        username={username}
                        password={password}
                        confirmPassword={confirmPassword}
                        usernameTaken={usernameTaken}
                        passwordsMatch={passwordsMatch}  
                    />
                );
            } 
            else if (step === 2) {
                const { firstName, lastName, email, phoneNumber } = comp.state;
                return (
                    < BasicInfoForm 
                        handleChange={comp.handleChange}
                        
                        firstName={firstName}
                        lastName={lastName}
                        email={email}
                        phoneNumber={phoneNumber}
                    />
                );
            }
            else if (step === 3) {
                const { country, address, afm } = comp.state;
                return (
                    < LocationForm 
                        handleChange={comp.handleChange}
                        
                        country={country}
                        address={address}
                        afm={afm}
                    />
                );
            }
        }

        let currentForm = formForStep(currentStep, this);
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

                        {currentForm}

                    </form>
                        
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
                <div className={classes.buttonBody}> 
                    <ProgressButtons 
                        handleSubmit={this.handleSubmit}
                        prevStep={this.prevStep}
                        nextStep={this.nextStep}
                        redirectToLogin={this.redirectToLogin}

                        currentStep={this.state.currentStep}
                        passwordsMatch={this.state.passwordsMatch}
                    />
                </div>
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

/*function mapDispatchToProps(dispatch) {
  return {
    login: (username, password) => dispatch(authOperations.login(username, password))
  };
}*/


const styledRegisterForm = withStyles(styles)(RegisterForm);
const connectedRegisterForm = connect(mapStateToProps)(styledRegisterForm);
export default connectedRegisterForm;