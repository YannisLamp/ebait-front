import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '100vh',
        flexGrow: 1,
    },
    grid: {
        height: '100%'
    },
}));
