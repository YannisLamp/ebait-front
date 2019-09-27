import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, IconButton, Table, TableBody, TableRow, TableCell, TablePagination } from '@material-ui/core';

import { CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxBlankIcon } from '@material-ui/icons';

import EditIcon from '@material-ui/icons/Edit';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import DeleteIcon from '@material-ui/icons/Delete';

import PaperTitle from '../../../sharedComp/PaperTitle';
import UserTableHead from './UserTableHead';


import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: 'inherit',
        overflowX: 'auto',
        display: 'block',
        whiteSpace: 'nowrap',
    },
    table: {
        //minWidth: 750,
    },
    tableWrapper: {
        marginTop: theme.spacing(4),
    },
    notDecorated: {
        textDecoration: 'none',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    pagination: {
        color: theme.palette.text.primary,
    },
    actions: {
        display: 'inline-block',
    },
    start: {
        color: theme.palette.primary.main,
    },
    edit: {
        color: 'black',
    },
    delete: {
        color: 'rgb(220, 0, 78)',
    },
}));


export default function MyAuctionsTable(props) {

    const headRows = [
        { id: 'name', right: false, disablePadding: true, label: 'Name' },
        { id: 'description', right: true, disablePadding: false, label: 'Description' },
        // { id: 'photo', right: true, disablePadding: false, label: 'Photo' },
        { id: 'country', right: true, disablePadding: false, label: 'Country' },
        { id: 'location', right: true, disablePadding: false, label: 'Location' },
        { id: 'firstBid', right: true, disablePadding: false, label: 'First Bid' },
        { id: 'buyout', right: true, disablePadding: false, label: 'Buyout' },
        { id: 'ends', right: true, disablePadding: false, label: 'Ends On' },
        { id: 'started', right: true, disablePadding: false, label: 'Started' },
        { id: 'actions', right: true, disablePadding: false, label: 'Actions' },
    ];


    const { auctions, order, orderBy, pageSize, isLoading, currPage, totalAuctions } = props;
    const { handleRequestSort, handleChangePage, handleChangeRowsPerPage, deleteAuction, startAuction } = props;

    //const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.users.length - page * rowsPerPage);
    // let emptyRows = pageSize;
    // if (props.auctions) {
    //     emptyRows = emptyRows - props.auctions.length;
    // }

    function desc(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function stableSort(array, cmp) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    }

    function getSorting(order, orderBy) {
        return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
    }

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid style={{ height: "100%" }} container direction="column" justify="flex-end">

                <PaperTitle
                    title='My Auctions'
                    suggestion={''}
                />


                <div className={classes.tableWrapper}>
                    {isLoading ? (
                        // <CircularProgress className={classes.progress} />
                        ''
                    ) : (
                            <>
                                <Table
                                    className={classes.table}
                                    aria-labelledby="Auctions"
                                    size={'small'}
                                >
                                    <UserTableHead
                                        headRows={headRows}
                                        order={order}
                                        orderBy={orderBy}
                                        onRequestSort={handleRequestSort}
                                    />
                                    <TableBody>
                                        {
                                            stableSort(auctions, getSorting(order, orderBy))
                                                .slice(currPage * pageSize, currPage * pageSize + pageSize)
                                                .map((row, index) => {
                                                    return (
                                                        <TableRow
                                                            hover
                                                            // onClick={e => changeUser(row)}
                                                            tabIndex={-1}
                                                            key={row.itemID}
                                                            //component={Button} to={"/admin/" + row.username}
                                                            className={classes.notDecorated}
                                                        >
                                                            <TableCell 
                                                                align="left"
                                                                className={classes.notDecorated}
                                                                component={Link}
                                                                to={{
                                                                    pathname: '/viewauction/' + row.itemID,
                                                                    state: {
                                                                        auction: row
                                                                    }
                                                                }}
                                                            >
                                                                {row.name}
                                                            </TableCell>
                                                            <TableCell 
                                                                align="right"
                                                                className={classes.notDecorated}
                                                                component={Link}
                                                                to={{
                                                                    pathname: '/viewauction/' + row.itemID,
                                                                    state: {
                                                                        auction: row
                                                                    }
                                                                }}
                                                            >
                                                                {row.description}
                                                            </TableCell>
                                                            <TableCell 
                                                                align="right"
                                                                className={classes.notDecorated}
                                                                component={Link}
                                                                to={{
                                                                    pathname: '/viewauction/' + row.itemID,
                                                                    state: {
                                                                        auction: row
                                                                    }
                                                                }}
                                                            >
                                                                {row.country}
                                                            </TableCell>
                                                            <TableCell 
                                                                align="right"
                                                                className={classes.notDecorated}
                                                                component={Link}
                                                                to={{
                                                                    pathname: '/viewauction/' + row.itemID,
                                                                    state: {
                                                                        auction: row
                                                                    }
                                                                }}
                                                            >
                                                                {row.location.text}
                                                            </TableCell>
                                                            <TableCell 
                                                                align="right"
                                                                className={classes.notDecorated}
                                                                component={Link}
                                                                to={{
                                                                    pathname: '/viewauction/' + row.itemID,
                                                                    state: {
                                                                        auction: row
                                                                    }
                                                                }}
                                                            >
                                                                {row.firstBid}
                                                            </TableCell>
                                                            <TableCell 
                                                                align="right"
                                                                className={classes.notDecorated}
                                                                component={Link}
                                                                to={{
                                                                    pathname: '/viewauction/' + row.itemID,
                                                                    state: {
                                                                        auction: row
                                                                    }
                                                                }}
                                                            >
                                                                {row.buyPrice}
                                                            </TableCell>
                                                            <TableCell 
                                                                align="right"
                                                                className={classes.notDecorated}
                                                                component={Link}
                                                                to={{
                                                                    pathname: '/viewauction/' + row.itemID,
                                                                    state: {
                                                                        auction: row
                                                                    }
                                                                }}
                                                            >
                                                                {row.ends}
                                                            </TableCell>
                                                            <TableCell 
                                                                align="right"
                                                                className={classes.notDecorated}
                                                                component={Link}
                                                                to={{
                                                                    pathname: '/viewauction/' + row.itemID,
                                                                    state: {
                                                                        auction: row
                                                                    }
                                                                }}
                                                            >
                                                                {row.eventStarted ? <CheckBoxIcon /> : <CheckBoxBlankIcon />}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {row.eventStarted ?
                                                                    '' :
                                                                    (<IconButton onClick={e => startAuction(row.itemID)}><PlayArrowIcon className={classes.start} /></IconButton>)
                                                                }
                                                                {((row.eventStarted && row.bids.length > 0) || row.eventFinished) ? ''
                                                                    : (<>
                                                                        <IconButton>
                                                                            <Link
                                                                                className={classes.edit}
                                                                                to={{
                                                                                    pathname: '/myauctions/edit-auction',
                                                                                    state: {
                                                                                        auction: row
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <EditIcon />
                                                                            </Link>
                                                                        </IconButton>

                                                                        <IconButton onClick={e => deleteAuction(row.itemID)}>
                                                                            <DeleteIcon className={classes.delete} />
                                                                        </IconButton>
                                                                    </>)
                                                                }
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })
                                        }
                                        {/* {emptyRows > 0 && (
                                        <TableRow style={{ height: 49 * emptyRows }}>
                                            <TableCell colSpan={5} />
                                        </TableRow>
                                    )} */}
                                    </TableBody>
                                </Table>


                                <TablePagination
                                    className={classes.pagination}
                                    rowsPerPageOptions={[5, 10, 15]}
                                    component="div"
                                    count={totalAuctions}
                                    rowsPerPage={pageSize}
                                    page={currPage}
                                    backIconButtonProps={{
                                        'aria-label': 'previous page',
                                    }}
                                    nextIconButtonProps={{
                                        'aria-label': 'next page',
                                    }}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}

                                />
                            </>
                        )
                    }

                </div>
            </Grid>
        </div>
    );


}