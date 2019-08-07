import React, { Component } from 'react';
import { connect } from 'react-redux';
import { alertActions } from '../../store/ducks/alertStore';

// Material components
import Snackbar from '@material-ui/core/Snackbar';

import SnackbarVariants from './SnackbarVariants';


function AlertSnackBar(props) {

    function handleClose() {
        const { dispatch } = props;
        dispatch(alertActions.clear());
    }

    const { alertStore } = props;

    if (alertStore.open) {
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                onClose={handleClose}
                open={alertStore.open}
                autoHideDuration={6000}
            >
                <SnackbarVariants
                    onClose={handleClose}
                    variant={alertStore.type}
                    message={alertStore.message}
                />
            </Snackbar>
        );
    }
    else {
        return '';
    }
}

function mapStateToProps(state) {
    const { alertStore } = state;
    return { alertStore };
}

export default connect(mapStateToProps)(AlertSnackBar);