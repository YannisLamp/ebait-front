export default theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100vh'
  },
  grid: {
    height: '100%'
  },
  
  quoteWrapper: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
 
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
});
