import React, { Component } from 'react';
import { Form, InputGroup, InputGroupAddon, Input, Card } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export default class MyLogin extends Component {
    constructor(props) {
      super(props);
      this.state = {username : '', password: ''};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    // https://serverless-stack.com/chapters/create-a-login-page.html

    handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    handleSubmit(e) {
      e.preventDefault();

      this.setState({ submitted: true });
      const { username, password } = this.state;
      console.log('logging');
      //const { dispatch } = this.props;
      //if (username && password) {
      //    dispatch(userActions.login(username, password));
      //}
  }

    render() {
      const { username, password } = this.state;
      const submitted = false;

      return (
        <div>
            <Form onSubmit={this.handleSubmit}>
                Sign In
                <InputGroup>
                    <InputGroupAddon className="input-group-text" addonType="prepend">
                        {/*<i class="fa fa-user" />*/}
                        <FontAwesomeIcon icon={faUser} />
                    </InputGroupAddon>
                    <Input type="text" placeholder="username" name='username' value={username} onChange={this.handleChange}/>
                    {submitted && !username &&
                      <div className="help-block">Username is required</div>
                    }
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon className="input-group-text" addonType="prepend">
                        <FontAwesomeIcon icon={faLock} />
                    </InputGroupAddon>
                    <Input type="password" placeholder="password" name='password' value={password} onChange={this.handleChange}/>
                    {submitted && !password &&
                      <div className="help-block">Username is required</div>
                    }
                </InputGroup>
                <button className="btn btn-primary">Sign Up</button>
            </Form>
        </div>
      );

    }


}