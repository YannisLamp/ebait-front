import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export default makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        //height: '100vh',
        //paddingLeft: theme.spacing(1),
        //paddingRight: theme.spacing(1)
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    
    profile: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 'fit-content'
    },
    userLogo: {
        marginTop: theme.spacing(12),
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
    bioText: {},
    profileDivider: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    listSubheader: {
        color: theme.palette.text.secondary
    },
    
    listItem: {
        cursor: 'pointer',
        '&:hover': {
        backgroundColor: theme.palette.primary.light,
        //borderLeft: `4px solid ${theme.palette.primary.main}`,
        //borderRadius: '4px',
        '& $listItemIcon': {
            color: theme.palette.secondary.light,
            //marginLeft: '-4px'
        },
        '& $listItemText': {
            color: theme.palette.text.secondary,
        },
        },
        '& + &': {
        marginTop: theme.spacing(1)
        }
    },
    activeListItem: {
        //borderLeft: `4px solid ${theme.palette.primary.secondary}`,
        //borderRadius: '4px',
        backgroundColor: theme.palette.primary.main,
        '& $listItemIcon': {
            color: theme.palette.secondary.main,
            //marginLeft: '-4px'
        },
        '& $listItemText': {
        color: theme.palette.text.secondary
        },
        
    },
    listItemIcon: {
        marginRight: 0,
        color: theme.palette.text.primary
    },
    listItemText: {
        fontWeight: 500,
        color: theme.palette.text.primary
    },

    listDivider: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },


    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        //padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        //marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    },

}));
