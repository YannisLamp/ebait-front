import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  header: {
    backgroundColor: '#ecf0f1',
    minHeight: '100vh',
    //display: flex,
    //flexDirection: 'column',
    //alignItems: 'center',
    //justifyContent: 'center',
    //fontSize: calc(10px + 2vmin),
    //color: white,
  },
  layout: {
        backgroundColor: theme.palette.background.default,
        height: '100vh',
        flexGrow: 1,
  }
}));