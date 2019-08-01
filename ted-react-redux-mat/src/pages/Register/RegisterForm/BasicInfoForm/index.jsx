import React from 'react';

// Material
import { TextField } from '@material-ui/core';

// For importing my custom styles  
import useStyles from './styles';


export default function BasicInfoForm(props) {
    const classes = useStyles();
    const { handleChange } = props; 

    return (
        <div className={classes.fields}>
            <TextField
                className={classes.textField}
                label="First Name"
                name="firstName"
                type="text"
                variant="outlined"
                onChange={handleChange}
            />
            <TextField
                className={classes.textField}
                label="Last Name"
                name="lastName"
                type="text"
                variant="outlined"
                onChange={handleChange}
            />
            <TextField
                className={classes.textField}
                label="Email"
                name="email"
                type="text"
                variant="outlined"
                onChange={handleChange}
            />
            <TextField
                className={classes.textField}
                label="Phone number"
                name="phoneNumber"
                type="number"
                variant="outlined"
                onChange={handleChange}
            />
            <TextField
                className={classes.textField}
                label="AFM"
                name="afm"
                type="text"
                variant="outlined"
                onChange={handleChange}
            />

        </div>
    );
}

