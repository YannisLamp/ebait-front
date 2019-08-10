import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize: '35px',
    fontWeight: '600',
  },
  titleLink: {
    textDecoration: 'none',
    color: theme.palette.text.secondary,
  },
  //grow: {
  //  flexGrow: 1,
  //},
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));