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

export default function BasicInfoForm(props) {
    const classes = useStyles();
    const { handleChange } = props; 
    const { firstName, lastName, email, phoneNumber } = props;

    return (
        <div className={classes.fields}>
            <TextField
                className={classes.textField}
                label="First Name"
                name="firstName"
                value={firstName}
                type="text"
                variant="outlined"
                onChange={handleChange}
                error={firstName.length === 1}
                helperText={firstName.length === 1 ? "First Name should be over 1 character" : ""}
            />
            <TextField
                className={classes.textField}
                label="Last Name"
                name="lastName"
                value={lastName}
                type="text"
                variant="outlined"
                onChange={handleChange}
                error={lastName.length === 1}
                helperText={lastName.length === 1 ? "Last Name should be over 1 character" : ""}
            />
            <TextField
                className={classes.textField}
                label="Email"
                name="email"
                value={email}
                type="text"
                variant="outlined"
                onChange={handleChange}
                error={(!email.includes("@") || email.length === 1 ) && email !== ""}
                helperText={(!email.includes("@") || email.length === 1 ) && email !== "" ? "Email should character and be over 1 character and include an @" : ""}
            />
            <TextField
                className={classes.textField}
                label="Phone number"
                name="phoneNumber"
                value={phoneNumber}
                type="number"
                variant="outlined"
                onChange={handleChange}
            />

        </div>
    );
}

