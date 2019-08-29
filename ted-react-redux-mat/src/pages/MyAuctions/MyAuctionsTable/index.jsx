import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Material
import {
    Grid, Paper, Button, Typography, CircularProgress,
    Table, TableBody, TableRow, TableCell, Checkbox, TablePagination, Switch
} from '@material-ui/core';

import { CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxBlankIcon } from '@material-ui/icons';

import PaperTitle from '../../../sharedComp/PaperTitle';
import UserTableHead from './UserTableHead';


import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        marginTop: theme.spacing(4),
        overflowX: 'auto',
    },
    notDecorated: {
        textDecoration: 'none',
        cursor: 'pointer',
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
    }
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
    ];


    const { auctions, order, orderBy, pageSize, isLoading, currPage, totalAuctions } = props;
    const { changeUser, handleRequestSort, handleChangePage, handleChangeRowsPerPage } = props;

    //const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.users.length - page * rowsPerPage);
    let emptyRows = pageSize;
    if (props.auctions) {
        emptyRows = emptyRows - props.auctions.length;
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
                                >
                                    <UserTableHead
                                        headRows={headRows}
                                        order={order}
                                        orderBy={orderBy}
                                        onRequestSort={handleRequestSort}
                                    />
                                    <TableBody>
                                        {
                                            auctions.map((row, index) => {
                                                return (
                                                    <TableRow
                                                        hover
                                                        // onClick={e => changeUser(row)}
                                                        tabIndex={-1}
                                                        key={row.itemID}
                                                        //component={Button} to={"/admin/" + row.username}
                                                        className={classes.notDecorated}
                                                    >
                                                        <TableCell align="left">{row.name}</TableCell>
                                                        <TableCell align="right">{row.description}</TableCell>
                                                        <TableCell align="right">{row.country}</TableCell>
                                                        <TableCell align="right">{row.location.text}</TableCell>
                                                        <TableCell align="right">{row.firstBid}</TableCell>
                                                        <TableCell align="right">{row.buyPrice}</TableCell>
                                                        <TableCell align="right">{row.ends}</TableCell>
                                                        {/* <TableCell align="right">{row.verified ? <CheckBoxIcon /> : <CheckBoxBlankIcon />}</TableCell> */}
                                                    </TableRow>
                                                );
                                            })}
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