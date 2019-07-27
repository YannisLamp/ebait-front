import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authOperations } from '../../store/ducks';

// Material
import { Grid, Paper } from '@material-ui/core';
// For importing my custom styles  
import { withStyles } from '@material-ui/core';
import styles from './styles';

import { LoginLeft } from './LoginLeft/LoginLeft';
import { LoginForm } from './LoginForm/LoginForm';

class MyLogin extends Component {
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

      this.setState({ submitted: true });
      const { username, password } = this.state;
      const { dispatch } = this.props;
      if (username && password) {
        dispatch(authOperations.login(username, password));
      }

      const { user } = this.props;
      console.log(user);
  }

    render() {
      const { username, password } = this.state;
      const submitted = false;
      
      const { classes } = this.props;

      return (
        <div>
        <div className={classes.root}>
        <Grid
          className={classes.grid}
          container
        >
          <Grid lg={1}/>
          <Grid
            className={classes.quoteWrapper}
            item
            lg={5}
          >
            <LoginLeft/>
          </Grid>
          <Grid
            className={classes.content}
            item
            lg={5}
            xs={12}
            justify="center"
          >
            <Paper>
            <LoginForm/>
            </Paper>
          </Grid>
          <Grid lg={1}/>
        </Grid>
      </div>
    </div>
    );
    }
}

const styledLogin = withStyles(styles)(MyLogin);
export { styledLogin as MyLogin };