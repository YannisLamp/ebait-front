import { makeStyles } from '@material-ui/core/styles';
import { amber, green } from '@material-ui/core/colors';

export default makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
        fontSize: 20,
    },
    error: {
        backgroundColor: theme.palette.error.dark,
        fontSize: 20,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
        fontSize: 20,
    },
    warning: {
        backgroundColor: amber[700],
        fontSize: 20,
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));