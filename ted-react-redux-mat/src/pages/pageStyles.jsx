//import Image from '../item_default.jpg';

export const pageStyles = (theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        flexGrow: 1,
        //backgroundImage: `url(${Image})`,
    },
    grid: {
        minHeight: '100vh'
    },
    pageWrapper: {
        marginTop: theme.spacing(14),
    },
    rightWrapper: {
        marginTop: theme.spacing(14),
        marginRight: theme.spacing(4),
    },
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
});