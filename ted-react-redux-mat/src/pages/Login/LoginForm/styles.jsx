export default theme => ({
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
  },
  contentBody: {
    paddingTop: theme.spacing(14),
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: '100px',
    paddingRight: '100px',
    paddingBottom: '100px',
    flexBasis: '700px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
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
  signInButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  signUp: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.primary
  },
  signUpUrl: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    '&:hover': {
      color: theme.palette.primary.main
    }
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





  guestInline: {
    display: 'inline-flex',
    marginTop: theme.spacing(10),
  },
  guestTitle:{
    alignText: 'center',
    marginRight: theme.spacing(4),
  },
  guestBtn: {
    
  },
  guestComment: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.primary
  },
});
