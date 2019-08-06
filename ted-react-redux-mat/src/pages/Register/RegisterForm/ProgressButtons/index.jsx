import React from 'react';

// Material
import { Button } from '@material-ui/core';

// For importing my custom styles  
import useStyles from './styles';


export default function ProgressButtons(props) {
    const classes = useStyles();
    const { redirectToLogin, prevStep, nextStep, handleSubmit } = props;
    const { currentStep, passwordsMatch } = props;

    /*if (currentStep === 1) {
        return (
            <Button
                    onClick={redirectToLogin}
                    size="large"
                    variant="contained"
                >
                    Back
                </Button>
        )


    }*/

    return (
        <div className={classes.progressButtons}>
            {(currentStep === 1) ? (
                <Button
                    onClick={redirectToLogin}
                    size="large"
                    variant="contained"
                >
                    Back
                </Button>
            ) : (
                <Button
                    onClick={prevStep}
                    size="large"
                    variant="contained"
                >
                    Back
                </Button>
            )}
            {(currentStep === 3) ? (
                <Button
                    color="primary"
                    onClick={handleSubmit}
                    size="large"
                    variant="contained"
                >
                    Register
                </Button>
            ) : (
                <Button
                    onClick={nextStep}
                    size="large"
                    variant="contained"
                    disabled={!passwordsMatch}
                >
                    Next
                </Button>
            )}
        </div>
    );
}