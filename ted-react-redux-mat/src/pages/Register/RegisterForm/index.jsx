import React, { Component } from 'react';
import { history } from '../../../utils';
import { connect } from 'react-redux';
import { registerApi } from '../../../services';

import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

import CredentialForm from './CredentialForm';
import BasicInfoForm from './BasicInfoForm';
import LocationForm from './LocationForm';

import ProgressButtons from './ProgressButtons';

const styles = theme => ({
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
    },
    contentHeader: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        [theme.breakpoints.down('lg')]: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
    },
    contentBody: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'flex-start',
        [theme.breakpoints.down('lg')]: {
            paddingTop: theme.spacing(2),
        },
    },
    form: {
        width: '100%',
        paddingLeft: theme.spacing(15),
        paddingRight: theme.spacing(15),
        [theme.breakpoints.down('lg')]: {
            paddingLeft: '80px',
            paddingRight: '80px',
            paddingBottom: theme.spacing(2),
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
    },
    buttonBody:{
        display: 'flex',
        alignItems: 'flex-end',
        paddingLeft: theme.spacing(15),
        paddingRight: theme.spacing(15),
        paddingBottom: theme.spacing(10),
        [theme.breakpoints.down('lg')]: {
            paddingLeft: '80px',
            paddingRight: '80px',
            paddingBottom: theme.spacing(8),
        },
    },
    title: {
        marginTop: theme.spacing(3)
    },
    subtitle: {
        color: theme.palette.text.primary,
        marginTop: theme.spacing(0.5)
    },
    sugestion: {
        color: theme.palette.text.primary,
        marginTop: theme.spacing(2),
        textAlign: 'center'
    },
    fields: {
        marginTop: theme.spacing(2)
    },
    textField: {
        width: '100%',
        '& + & ': {
            marginTop: theme.spacing(2)
        }
    },
    progress: {
        display: 'block',
        marginTop: theme.spacing(2),
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    
    fieldError: {
        color: theme.palette.danger.main,
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(1)
    },
    submitError: {
        color: theme.palette.danger.main,
        alignText: 'center',
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(2)
    },

});


class RegisterForm extends Component {

    state = {
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


    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState, props) => { return { [name]: value } });
    }

    handleSubmit = (e) => {
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


    checkPasswordMatch = () => {
        this.setState((prevState, props) => { 
            return { 'passwordsMatch': prevState.password === prevState.confirmPassword } 
        });
    }

    checkUsernameExists = () => {
        registerApi.checkUsernameExists(this.state.username)
            .then(data => {
                let taken = data.exists;
                this.setState((prevState, props) => { return { 'usernameTaken': taken } });
            }
            );
    }

    prevStep = () => {
        this.setState((prevState, props) => { 
            return { 'currentStep': prevState.currentStep - 1 } 
        });
    }
        
    nextStep = () => {
        this.setState((prevState, props) => {
            return { 'currentStep': prevState.currentStep + 1 } 
        });
    }

    redirectToLogin = () => {
        history.push('/login');
    }

    render() {
        const { passwordsMatch, currentStep, usernameTaken } = this.state;
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