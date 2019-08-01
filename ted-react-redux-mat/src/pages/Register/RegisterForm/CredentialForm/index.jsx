import React from 'react';

// Material
import { TextField } from '@material-ui/core';

// For importing my custom styles  
import useStyles from './styles';


export default function CredentialForm(props) {
    const classes = useStyles();
    const { handleChange, checkPasswordMatch, passwordsMatch } = props; 

    return (
        <div className={classes.fields}>
            <TextField
                className={classes.textField}
                label="Username"
                name="username"
                type="text"
                variant="outlined"
                onChange={handleChange}
            />
            <TextField
                className={classes.textField}
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                onChange={(e) => { handleChange(e); checkPasswordMatch(); }}
                error={!passwordsMatch}
            />
            <TextField
                className={classes.textField}
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                variant="outlined"
                onChange={(e) => { handleChange(e); checkPasswordMatch(); }}
                error={!passwordsMatch}
            />
        </div>
    );
}