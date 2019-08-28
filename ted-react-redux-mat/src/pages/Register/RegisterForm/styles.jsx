export default theme => ({
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
    },
    contentHeader: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        [theme.breakpoints.down('lg')]: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
    },
    contentBody: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'flex-start',
        [theme.breakpoints.down('lg')]: {
            paddingTop: theme.spacing(2),
        },
    },
    form: {
        width: '100%',
        paddingLeft: theme.spacing(15),
        paddingRight: theme.spacing(15),
        [theme.breakpoints.down('lg')]: {
            paddingLeft: '80px',
            paddingRight: '80px',
            paddingBottom: theme.spacing(2),
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
    },
    buttonBody:{
        display: 'flex',
        alignItems: 'flex-end',
        paddingLeft: theme.spacing(15),
        paddingRight: theme.spacing(15),
        paddingBottom: theme.spacing(10),
        [theme.breakpoints.down('lg')]: {
            paddingLeft: '80px',
            paddingRight: '80px',
            paddingBottom: theme.spacing(8),
        },
    },
    title: {
        marginTop: theme.spacing(3)
    },
    subtitle: {
        color: theme.palette.text.primary,
        marginTop: theme.spacing(0.5)
    },
    sugestion: {
        color: theme.palette.text.primary,
        marginTop: theme.spacing(2),
        textAlign: 'center'
    },
    fields: {
        marginTop: theme.spacing(2)
    },
    textField: {
        width: '100%',
        '& + & ': {
            marginTop: theme.spacing(2)
        }
    },
    progress: {
        display: 'block',
        marginTop: theme.spacing(2),
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    
    fieldError: {
        color: theme.palette.danger.main,
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(1)
    },
    submitError: {
        color: theme.palette.danger.main,
        alignText: 'center',
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(2)
    },

});
