import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '100vh'
    },
    grid: {
        height: '100%'
    },
    quoteWrapper: {
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
    },

    quote: {
        backgroundColor: theme.palette.background.default,
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(/images/sign_up_1.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      },
      quoteInner: {
        textAlign: 'center',
        flexBasis: '600px'
      },
      welcomeText: {
        fontSize: '50px',
        color: theme.palette.primary.main,
        fontWeight: 400,
        marginBottom: theme.spacing(10),
      },
      quoteText: {
        color: theme.palette.primary.main,
        fontWeight: 300
      },

}));
