import React from 'react';
import { Link } from 'react-router-dom';

// Material
import { Avatar, Divider, Typography, Grid, Button } from '@material-ui/core';

// For importing my custom styles  
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',

    },
    // profile: {
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     //minHeight: 'fit-content'
    // },
    // details: {
    //     height: '100%',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     //minHeight: 'fit-content',
    //     //alignItems: 'end',
    //     justifyContent: 'flex-end',
    // },
    button: {
        display: 'flex',
        flexDirection: 'column',
        justify: 'flexEnd',
    },
    userLogo: {
        marginTop: theme.spacing(8),
        margin: 5,
        width: 80,
        height: 80,
    },
    notDecorated: { 
        textDecoration: 'none',
    },
    usernameText: {
        marginTop: theme.spacing(2)
    },
    nameText: {
        marginTop: theme.spacing(1)
    },
    bioText: {marginTop: theme.spacing(1)},
    profileDivider: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },

}));

export default function UserVerification(props) {
    const classes = useStyles();

    let { user } = props;
    if (!user) {
        user = {username: 'lalala', firstName: 'aaaa', lastName:'ooooo', };
    }

    const role = user.userRole === 'USER' ? 'User' : 'Administrator';
    const verified = user.verified === true && user.userRole === 'USER' ? 'Verified' : ' ';

    return (
        <div className={classes.root}>
        <div className={classes.profile}>
            <Typography variant="h3">
                User Details
            </Typography>
            {/* <NavLink to="/profile" className={classes.notDecorated}> */}
                <Avatar className={classes.userLogo}>
                    {user.firstName && user.lastName ?
                        user.firstName.charAt(0) + user.lastName.charAt(0)
                        :
                        'G'
                    }
                </Avatar>
            {/* </NavLink> */}

            <Typography
                className={classes.usernameText}
                variant="h5"
            >
                {user.username}
            </Typography>

            <Typography
                className={classes.nameText}
                variant="h6"
            >
                {user.firstName}{' '}{user.lastName}
            </Typography>
            <Typography
                className={classes.bioText}
                variant="h6"
            >
                {verified + ' ' + role}
            </Typography>
        </div>
        <Divider className={classes.profileDivider} />

        
        <div className={classes.details}>

            <Typography
                    className={classes.nameText}
                    variant="h6"
                >
                    {user.email}
                </Typography>

                <Typography
                    className={classes.nameText}
                    variant="h6"
                >
                    {user.phoneNumber}
                </Typography>

                <Typography
                    className={classes.nameText}
                    variant="h6"
                >
                    {user.country + ', ' + user.address}
                </Typography>

            <Divider className={classes.profileDivider} />

            </div>


    </div>


    );

}


