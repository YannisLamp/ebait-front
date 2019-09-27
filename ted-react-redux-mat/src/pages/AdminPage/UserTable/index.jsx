import React from 'react';

import { Table, TableBody, TableRow, TableCell, TablePagination } from '@material-ui/core';

import { CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxBlankIcon } from '@material-ui/icons';

import PaperTitle from '../../../sharedComp/PaperTitle';
import UserTableHead from './UserTableHead';

import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: 'inherit',
        overflow: 'auto',
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


export default function UserTable(props) {
    const headRows = [
        { id: 'username', right: false, disablePadding: true, label: 'Username' },
        { id: 'firstName', right: true, disablePadding: false, label: 'First Name' },
        { id: 'lastName', right: true, disablePadding: false, label: 'Last Name' },
        { id: 'country', right: true, disablePadding: false, label: 'Country' },
        { id: 'email', right: true, disablePadding: false, label: 'Email' },
        { id: 'verified', right: true, disablePadding: false, label: 'Verified' },
    ];

    const { users, order, orderBy, pageSize, isLoading, currPage, totalUsers } = props;
    const { changeUser, handleRequestSort, handleChangePage, handleChangeRowsPerPage } = props;

    //const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.users.length - page * rowsPerPage);
    // let emptyRows = pageSize;
    // if (props.users) {
    //     emptyRows = emptyRows - props.users.length;
    // }

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <PaperTitle
                title='Registered Users'
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
                                aria-labelledby="Users"
                            >
                                <UserTableHead
                                    headRows={headRows}
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {
                                        users.map((row, index) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={e => changeUser(row)}
                                                    tabIndex={-1}
                                                    key={row.username}
                                                    //component={Button} to={"/admin/" + row.username}
                                                    className={classes.notDecorated}
                                                >

                                                    <TableCell align="left">{row.username}</TableCell>
                                                    <TableCell align="right">{row.firstName}</TableCell>
                                                    <TableCell align="right">{row.lastName}</TableCell>
                                                    <TableCell align="right">{row.country}</TableCell>
                                                    <TableCell align="right">{row.email}</TableCell>
                                                    <TableCell align="right">{row.verified ? <CheckBoxIcon /> : <CheckBoxBlankIcon />}</TableCell>
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
                                count={totalUsers}
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

            {/* <Typography component="div">
                    <Grid component="label" container alignItems="center" spacing={1}>
                        <Grid item>Only non verified</Grid>
                        <Grid item>
                            <Switch
                                //checked={state.checkedC}
                                //onChange={handleChange('checkedC')}
                                value="checkedC"
                            />
                        </Grid>
                        <Grid item>All Users</Grid>
                    </Grid>
                </Typography> */}

            {/* </Grid> */}
        </div>
    );

}