import React, { Component } from 'react';
import { connect } from 'react-redux';
import { alertActions } from '../../store/ducks/alert';

// Material components
import Snackbar from '@material-ui/core/Snackbar';

import SnackbarVariants from './SnackbarVariants';


function AlertSnackBar(props) {

    function handleClose() {
        const { dispatch } = props;
        dispatch(alertActions.clear());
    }

    const { alert } = props;

    if (alert.open) {
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                onClose={handleClose}
                open={alert.open}
                autoHideDuration={6000}
            >
                <SnackbarVariants
                    onClose={handleClose}
                    variant={alert.type}
                    message={alert.message}
                />
            </Snackbar>
        );
    }
    else {
        return '';
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return { alert };
}

export default connect(mapStateToProps)(AlertSnackBar);