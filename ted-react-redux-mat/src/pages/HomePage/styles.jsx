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
    quoteWrapper: {
        marginTop: theme.spacing(10),
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    },
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    formPaper: {
        minHeight: '75vh',
    }
}));
