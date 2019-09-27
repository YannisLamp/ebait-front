import React from 'react';

// Material
import { TextField } from '@material-ui/core';

// For importing my custom styles  
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    fields: {
        marginTop: theme.spacing(2)
    },
    textField: {
        width: '100%',
        '& + & ': {
            marginTop: theme.spacing(2)
        }
    },
}));

export default function CredentialForm(props) {
    const classes = useStyles();
    const { handleChange, checkPasswordMatch, checkUsernameExists } = props; 
    const { username, password, confirmPassword, passwordsMatch, usernameTaken } = props;

    return (
        <div className={classes.fields}>
            <TextField
                className={classes.textField}
                label="Username"
                name="username"
                value={username}
                type="text"
                variant="outlined"
                onChange={handleChange}
                onBlur={checkUsernameExists}
                error={usernameTaken}
                helperText={usernameTaken ? "Username is taken" : ""}
            />
            <TextField
                className={classes.textField}
                label="Password"
                name="password"
                value={password}
                type="password"
                variant="outlined"
                onChange={(e) => { handleChange(e); checkPasswordMatch(); }}
                error={!passwordsMatch}
            />
            <TextField
                className={classes.textField}
                label="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                type="password"
                variant="outlined"
                onChange={(e) => { handleChange(e); checkPasswordMatch(); }}
                error={!passwordsMatch}
                helperText={!passwordsMatch ? "Passwords should match and must be over 8 characters" : ""}
            />
        </div>
    );
}