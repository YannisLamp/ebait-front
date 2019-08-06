import React from 'react';

// Material components
import { CheckCircle as CheckCircleIcon, Error as ErrorIcon, 
    Info as InfoIcon, Close as CloseIcon, Warning as WarningIcon } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';

// Component styles
import useStyles from './styles';


const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};


export default function SnackbarVariants(props) {
    const classes = useStyles();
    const { message, onClose, variant } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classes[variant]}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={classes.iconVariant} />
                    {message}
                </span>
            }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
        />
    );
}