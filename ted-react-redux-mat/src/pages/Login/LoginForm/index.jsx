import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//import { userOperations } from '../../../store/ducks';

// Material
import { Grid, Button, IconButton, CircularProgress, TextField, Typography} from '@material-ui/core';

// For importing my custom styles  
import { withStyles } from '@material-ui/core';
import styles from './styles';


class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {username : '', password: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // https://serverless-stack.com/chapters/create-a-login-page.html

  handleChange(e) {
    const { name, value } = e.target;
    this.setState((prevState, props) => {return {[name]: value }});
  }

  handleSubmit(e) {
    e.preventDefault();

    /*this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(authOperations.login(username, password));
    }

    const { user } = this.props;
    console.log(user);*/
  }

  render() {
    const { username, password } = this.state;
    const submitted = false;
      
    const { classes } = this.props;

    return (
      <div className={classes.content}>
        <div className={classes.contentHeader}/>
        <div className={classes.contentBody}>
          <form className={classes.form}>
            <Typography
              className={classes.title}
              variant="h2"
            >
              Log in
            </Typography>
            <Typography
              className={classes.sugestion}
              variant="body1"
            >
              with your username
            </Typography>
            <div className={classes.fields}>
              <TextField
                className={classes.textField}
                label="Username"
                name="username"
                type="text"
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                label="Password"
                name="password"
                type="password"
                variant="outlined"
              />
            </div>
                  {/*isLoading ? (
                    <CircularProgress className={classes.progress} />
                  ) : (
                    <Button
                      className={classes.signInButton}
                      color="primary"
                      disabled={!isValid}
                      onClick={this.handleSignIn}
                      size="large"
                      variant="contained"
                    >
                      Sign in now
                    </Button>
                  )*/}
            <Typography
              className={classes.signUp}
              variant="body1"
            >
              Don't have an account?{' '}
              <Link
                className={classes.signUpUrl}
                to="/sign-up"
              >
                Sign up
              </Link>
            </Typography>
            
            <div className={classes.guestInline}>
              <Typography
                className={classes.guestTitle}
                variant="h2"
              >
                or
              </Typography>
              <Button variant="outlined" color="primary" className={classes.guestBtn}>
                Continue as guest
              </Button>
            </div>
            
            <Typography
              className={classes.guestComment}
              variant="body1"
            >
            </Typography>
              
          </form>
        </div>
      </div>
    )

  }
}



function mapStateToProps(state) {
  const { auth } = state;
  const { user } = auth;
  return {
    user
  };
}
  
/*function mapDispatchToProps(dispatch) {
  return {
    login: (username, password) => dispatch(authOperations.login(username, password))
  };
}*/
  
  
const styledLoginForm = withStyles(styles)(LoginForm);
export default styledLoginForm;
//const connectedLoginForm = connect(mapStateToProps)(styledLoginForm);
//export default connectedLoginForm;