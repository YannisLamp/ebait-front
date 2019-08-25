import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { history } from '../../../utils';

import { registerApi } from '../../../services';

import PaperTitle from '../../../sharedComp/PaperTitle';

// Material
import { IconButton, CircularProgress, TextField, Typography } from '@material-ui/core';

// For importing my custom styles  
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    root: {
        height: '80vh',
        width: '100%',

    },
    grid: {
        height: '100%',
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
        width: theme.spacing(25)
    },
    progress: {
        display: 'block',
        marginTop: theme.spacing(2),
        marginLeft: 'auto',
        marginRight: 'auto'
    },

});


class AuctionForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
            currentStep: 1,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.checkPasswordMatch = this.checkPasswordMatch.bind(this);

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
            country, address, afm } = this.state;
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

        // let userStuff = '';
        // if (this.props.user) {
        //     const { user } = this.props;
        //     userStuff = user.username + ',' + user.userId + ',' + user.firstName;
        // }


        const { currentStep } = this.state;
        // const submitted = false;

        const { classes } = this.props;

        // function formForStep(step, comp) {
        //     if (step === 1) {
        //         const { username, password, confirmPassword } = comp.state;
        //         return (
        //             < CredentialForm
        //                 handleChange={comp.handleChange}
        //                 checkPasswordMatch={comp.checkPasswordMatch}
        //                 checkUsernameExists={comp.checkUsernameExists}

        //                 username={username}
        //                 password={password}
        //                 confirmPassword={confirmPassword}
        //                 usernameTaken={usernameTaken}
        //                 passwordsMatch={passwordsMatch}
        //             />
        //         );
        //     }
        //     else if (step === 2) {
        //         const { firstName, lastName, email, phoneNumber } = comp.state;
        //         return (
        //             < BasicInfoForm
        //                 handleChange={comp.handleChange}

        //                 firstName={firstName}
        //                 lastName={lastName}
        //                 email={email}
        //                 phoneNumber={phoneNumber}
        //             />
        //         );
        //     }
        //     else if (step === 3) {
        //         const { country, address, afm } = comp.state;
        //         return (
        //             < LocationForm
        //                 handleChange={comp.handleChange}

        //                 country={country}
        //                 address={address}
        //                 afm={afm}
        //             />
        //         );
        //     }
        // }

        // let currentForm = formForStep(currentStep, this);
        return (
            <div className={classes.root}>
                <PaperTitle
                    title='Create an Auction'
                    suggestion={'Step ' + currentStep}
                />
                        

                        {/* {currentForm} */}


                {/* <div className={classes.buttonBody}>
                    <ProgressButtons
                        handleSubmit={this.handleSubmit}
                        prevStep={this.prevStep}
                        nextStep={this.nextStep}
                        redirectToLogin={this.redirectToLogin}

                        currentStep={this.state.currentStep}
                        passwordsMatch={this.state.passwordsMatch}
                    />
                </div> */}
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


const styledAuctionForm = withStyles(styles)(AuctionForm);
export default styledAuctionForm;