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
    const { handleChange } = props; 
    const { country, address, afm } = props;

    return (
        <div className={classes.fields}>
            <TextField
                className={classes.textField}
                label="Country"
                name="country"
                value={country}
                type="text"
                variant="outlined"
                onChange={handleChange}
            />
            <TextField
                className={classes.textField}
                label="Address"
                name="address"
                value={address}
                type="text"
                variant="outlined"
                onChange={handleChange}
            />
            <TextField
                className={classes.textField}
                label="Tax Identification Number"
                name="afm"
                value={afm}
                type="text"
                variant="outlined"
                onChange={handleChange}
            />
        </div>
    );
}