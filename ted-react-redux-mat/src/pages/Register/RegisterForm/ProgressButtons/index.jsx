import React from 'react';

// Material
import { Button, CircularProgress } from '@material-ui/core';

// For importing my custom styles  
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    progressButtons: {
        width: '100%',
        display: 'inline-flex',
        marginTop: theme.spacing(8),
        justifyContent: 'space-between',
    },
    circularProgress: {
        //display: 'block',
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(4),
    },
}));

export default function ProgressButtons(props) {
    const classes = useStyles();
    const { redirectToLogin, prevStep, nextStep, handleSubmit } = props;
    const { currentStep, passwordsMatch, isLoading } = props;


    function returnBackButton(step) {
        if (step === 1) {
            return (
                <Button
                    onClick={redirectToLogin}
                    size="large"
                    variant="contained"
                >
                    Back
                </Button>
            )
        }
        else {
            return (
                <Button
                    onClick={prevStep}
                    size="large"
                    variant="contained"
                >
                    Back
                </Button>
            )
        }
    }

    function returnNextButton(step, isLoading) {
        if (step === 3) {
            if (isLoading) {
                return (
                    <CircularProgress className={classes.circularProgress} />
                );
            }
            else {
                return (
                    <Button
                        color="primary"
                        onClick={handleSubmit}
                        size="large"
                        variant="contained"
                    >
                        Register
                    </Button>
                );
            }
            
        }
        else {
            return (
                <Button
                    onClick={nextStep}
                    size="large"
                    variant="contained"
                    disabled={!passwordsMatch}
                >
                    Next
                </Button>
            );
        }
    }

    return (
        <div className={classes.progressButtons}>
            {returnBackButton(currentStep)}
            {returnNextButton(currentStep, isLoading)}
        </div>
    );
}