import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    root: {
        padding: theme.spacing.unit * 4,
        textAlign: 'center'
    },
    company: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 0.5
    }
}));