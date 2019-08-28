import React from 'react';

import { Button, CircularProgress } from '@material-ui/core';  
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    progressButtons: {
        width: '100%',
        display: 'inline-flex',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        justifyContent: 'space-between',
    },
}));

export default function CreateAuctionProgress(props) {
    const classes = useStyles();
    const { redirectToLogin, prevStep, nextStep, handleSubmit } = props;
    const { currentStep, isLoading } = props;


    function returnBackButton(step) {
        if (step === 1) {
            return (
                <Button
                    onClick={redirectToLogin}
                    size="large"
                    variant="contained"
                >
                    Cancel
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
        if (step === 2) {
            if (isLoading) {
                return (
                    <CircularProgress />
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
                        Create
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