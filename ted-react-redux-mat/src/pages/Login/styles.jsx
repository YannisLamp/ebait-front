import { makeStyles } from '@material-ui/core/styles';

import { pageStyles } from '../pageStyles';

export default makeStyles(theme => ({
  ...pageStyles(theme),
  quoteWrapper: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  loginAsGuest: {
    marginTop: theme.spacing(8),
  },
}));
