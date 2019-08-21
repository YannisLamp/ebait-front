import { makeStyles } from '@material-ui/core/styles';

import { pageStyles } from '../pageStyles';

export default makeStyles(theme => ({
    ...pageStyles(theme),
}));