import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    flexGrow: 0.7,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize: '35px',
    fontWeight: '600',
  },
}));