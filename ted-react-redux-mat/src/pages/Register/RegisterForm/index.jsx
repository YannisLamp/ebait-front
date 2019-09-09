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

        
        const { passwordsMatch, currentStep, usernameTaken } = this.state;
        const submitted = false;

        const { classes } = this.props;

        let isLoading = false;
        if (this.props.userStore.registering || this.props.userStore.loggingIn)
            isLoading = true;


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

                        {formForStep(currentStep, this)}

                    </form>
                        
                </div>

                <div className={classes.buttonBody}> 
                    <ProgressButtons 
                        handleSubmit={this.handleSubmit}
                        prevStep={this.prevStep}
                        nextStep={this.nextStep}
                        redirectToLogin={this.redirectToLogin}

                        currentStep={this.state.currentStep}
                        passwordsMatch={this.state.passwordsMatch}

                        isLoading={isLoading}
                    />
                </div>
            </div>
        );
    }
}



function mapStateToProps(state) {
    const { userStore } = state;
    return {
        userStore
    };
}


const styledRegisterForm = withStyles(styles)(RegisterForm);
const connectedRegisterForm = connect(mapStateToProps)(styledRegisterForm);
export default connectedRegisterForm;