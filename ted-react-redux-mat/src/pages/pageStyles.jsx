export const pageStyles = (theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        flexGrow: 1,
    },
    grid: {
        minHeight: '100vh'
    },
    pageWrapper: {
        marginTop: theme.spacing(14),
    },
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
});