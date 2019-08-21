import { makeStyles } from '@material-ui/core/styles';

import { pageStyles } from '../pageStyles';

export default makeStyles(theme => ({
    ...pageStyles(theme),
    paper: {
        width: '100%',
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingBottom: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}));