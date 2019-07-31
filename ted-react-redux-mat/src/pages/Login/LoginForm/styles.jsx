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
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  backButton: {},
  logoImage: {
    marginLeft: theme.spacing.unit * 4
  },
  contentBody: {
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
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2
    }
  },
  title: {
    marginTop: theme.spacing.unit * 3
  },
  subtitle: {
    color: theme.palette.text.primary,
    marginTop: theme.spacing.unit * 0.5
  },
  sugestion: {
    color: theme.palette.text.primary,
    marginTop: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  fields: {
    marginTop: theme.spacing.unit * 2
  },
  textField: {
    width: '100%',
    '& + & ': {
      marginTop: theme.spacing.unit * 2
    }
  },
  policy: {
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  policyText: {
    display: 'inline',
    color: theme.palette.text.secondary
  },
  policyUrl: {
    color: theme.palette.text.primary,
    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.primary.main
    }
  },
  progress: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  signInButton: {
    marginTop: theme.spacing.unit * 2,
    width: '100%'
  },
  signUp: {
    marginTop: theme.spacing.unit * 2,
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
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit
  },
  submitError: {
    color: theme.palette.danger.main,
    alignText: 'center',
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2
  },





  guestInline: {
    display: 'inline-flex',
    marginTop: theme.spacing.unit * 10,
  },
  guestTitle:{
    alignText: 'center',
    marginRight: theme.spacing.unit * 4,
  },
  guestBtn: {
    
  },
  guestComment: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.text.primary
  },
});
