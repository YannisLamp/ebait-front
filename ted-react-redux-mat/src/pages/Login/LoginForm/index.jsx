import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginApi } from '../../../services';

// Material
import { Grid, Button, IconButton, CircularProgress, TextField, Typography } from '@material-ui/core';

// For importing my custom styles  
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
    },
    contentBody: {
        paddingTop: theme.spacing(7),
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
        paddingBottom: theme.spacing(14),
        flexBasis: '700px',
        [theme.breakpoints.down('lg')]: {
            paddingLeft: '80px',
            paddingRight: '80px',
            paddingBottom: theme.spacing(7),
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            paddingBottom: theme.spacing(3),
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
});


class LoginForm extends Component {

    state = { username: '', password: '', };

    componentDidMount() {
        this.props.dispatch(loginApi.logoutThunk());
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState, props) => { return { [name]: value } });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            console.log('username and pass');
            dispatch(loginApi.loginThunk(username, password));
        }
    }

    render() {
        const { username } = this.state;

        const { classes, userStore } = this.props;
        const { loggingIn } = userStore;
        return (
            <div className={classes.content}>
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
                                value={username}
                                type="text"
                                variant="outlined"
                                onChange={this.handleChange}
                            />
                            <TextField
                                className={classes.textField}
                                label="Password"
                                name="password"
                                type="password"
                                variant="outlined"
                                onChange={this.handleChange}
                            />
                        </div>
                        {loggingIn ?
                            (
                                <CircularProgress className={classes.progress} />
                            ) : (
                                <Button
                                    className={classes.signInButton}
                                    color="primary"
                                    type="submit"
                                    onClick={this.handleSubmit}
                                    size="large"
                                    variant="contained"
                                >
                                    Log in
                            </Button>
                            )}
                        <Typography
                            className={classes.signUp}
                            variant="body1"
                        >
                            Don't have an account?{' '}
                            <Link
                                className={classes.signUpUrl}
                                to="/register"
                            >
                                Register
                            </Link>
                        </Typography>

                    </form>
                </div>
            </div>
        );

    }
}



function mapStateToProps(state) {
    const { userStore } = state;
    return {
        userStore
    };
}

const styledLoginForm = withStyles(styles)(LoginForm);
const connectedLoginForm = connect(mapStateToProps)(styledLoginForm);
export default connectedLoginForm;