import { makeStyles } from '@material-ui/core/styles';

import { pageStyles } from '../pageStyles';

export default makeStyles(theme => ({
    ...pageStyles(theme),
    contentOld: {
        // height: '100%',
        // display: 'flex',
        // flexDirection: 'column'
    },
    formPaper: {
        minHeight: '70vh',
    }
}));
