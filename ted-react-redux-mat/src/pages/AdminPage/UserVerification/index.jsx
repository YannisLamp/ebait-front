import React from 'react';

import { Avatar, Divider, Typography, Grid, Button, CircularProgress } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import PaperTitle from '../../../sharedComp/PaperTitle';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        minHeight: 'inherit',
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
    bioText: {
        marginTop: theme.spacing(1)
    },
    profileDivider: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    verify: {
        marginBottom: theme.spacing(2),
    }
}));

export default function UserVerification(props) {
    const classes = useStyles();

    let { user } = props;
    if (!user) {
        user = { username: 'lalala', firstName: 'aaaa', lastName: 'ooooo', };
    }

    const role = user.userRole === 'USER' ? 'User' : 'Administrator';
    const verified = user.verified === true && user.userRole === 'USER' ? 'Verified' : ' ';

    const { isLoading } = props;

    return (
        <Grid
            className={classes.root}
            container
            direction="column"
            justify="space-between"
        >
            <Grid
                item
            >
                <PaperTitle
                    title='User Details'
                    suggestion={''}
                />

                <Grid
                    container
                    direction="column"
                    alignItems="center"
                >
                    <Avatar className={classes.userLogo}>
                        {user.firstName.charAt(0) + user.lastName.charAt(0)}
                    </Avatar>

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

                </Grid>

                <Divider className={classes.profileDivider} />




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

                <Typography
                    className={classes.nameText}
                    variant="h6"
                >
                    {user.afm}
                </Typography>

                <Divider className={classes.profileDivider} />

            </Grid>

            <Grid
                item
            >
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                >
                    {isLoading ?
                        (
                            <CircularProgress className={classes.verify} />
                        ) : (
                            <Button
                                className={classes.verify}
                                color="primary"
                                type="submit"
                                onClick={props.verifyUser}
                                size="large"
                                variant="contained"
                                disabled={user.verified}
                            >
                                {user.verified ? 'Verified' : 'Verify User'}
                            </Button>
                        )
                    }
                </Grid>

            </Grid>

        </Grid>
    );

}


