import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Material
import {
    Grid, Paper, Button, Typography,
    Table, TableBody, TableRow, TableCell, Checkbox, TablePagination, Switch
} from '@material-ui/core';

import { CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxBlankIcon } from '@material-ui/icons';

import UserTableHead from './UserTableHead';

import { withStyles } from '@material-ui/core';

import { usersApi } from '../../../services'


const styles = theme => ({
    root: {
        width: '100%',
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
});


class UserTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: null,
            order: 'asc',
            orderBy: 'username',
            pageSize: 10,
            currPage: 0,

            users: [],
            totalPages: null,
            totalUsers: null,
        };

        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleRequestSort = this.handleRequestSort.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.queryTableData = this.queryTableData.bind(this);
    }


    componentDidMount() {
        const { orderBy, order, pageSize, currPage } = this.state;
        this.queryTableData(orderBy, order, pageSize, currPage);
    }

    queryTableData(orderBy, order, pageSize, currPage) {
        // Start Loading
        this.setState((prevState, props) => {
            return { isLoading: true }
        })

        usersApi.getUsers(orderBy, order, pageSize, currPage)
            .then(data => {
                this.setState((prevState, props) => {
                    return {
                        users: data.users,
                        totalPages: data.totalPages,
                        totalUsers: data.totalUsers,
                        isLoading: false
                    }
                })
            });
    }

    headRows = [
        { id: 'username', right: false, disablePadding: true, label: 'Username' },
        { id: 'firstName', right: true, disablePadding: false, label: 'First Name' },
        { id: 'lastName', right: true, disablePadding: false, label: 'Last Name' },
        { id: 'country', right: true, disablePadding: false, label: 'Country' },
        { id: 'address', right: true, disablePadding: false, label: 'Address' },
        { id: 'email', right: true, disablePadding: false, label: 'Email' },
        { id: 'verified', right: true, disablePadding: false, label: 'Verified' },
    ];



    handleRequestSort(event, property) {
        this.setState((prevState, props) => {
            const { order, orderBy, currPage, pageSize } = prevState;
            const isDesc = orderBy === property && order === 'desc';
            const newOrder = isDesc ? 'asc' : 'desc';

            // Also alters State and needs to know the new state
            this.queryTableData(property, newOrder, pageSize, 0);
            return {
                order: newOrder,
                orderBy: property,
                currPage: 0,
            }
        });
    }

    // handleClick(event, name) {
    //     const selectedIndex = selected.indexOf(name);
    //     let newSelected = [];

    //     if (selectedIndex === -1) {
    //         newSelected = newSelected.concat(selected, name);
    //     } else if (selectedIndex === 0) {
    //         newSelected = newSelected.concat(selected.slice(1));
    //     } else if (selectedIndex === selected.length - 1) {
    //         newSelected = newSelected.concat(selected.slice(0, -1));
    //     } else if (selectedIndex > 0) {
    //         newSelected = newSelected.concat(
    //             selected.slice(0, selectedIndex),
    //             selected.slice(selectedIndex + 1),
    //         );
    //     }

    //     setSelected(newSelected);
    // }

    handleChangePage(event, newPage) {
        this.setState((prevState, props) => {
            const { order, orderBy, pageSize } = prevState;

            this.queryTableData(orderBy, order, pageSize, newPage);
            return {
                currPage: newPage
            }
        });
    }

    handleChangeRowsPerPage(event) {
        this.setState((prevState, props) => {
            const { order, orderBy } = prevState;
            const newPageSize = +event.target.value;

            this.queryTableData(orderBy, order, newPageSize, 0);
            return {
                currPage: 0,
                pageSize: newPageSize,
            }
        });

    }


    render() {
        const { pageSize } = this.state;
        //const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.users.length - page * rowsPerPage);
        let emptyRows = pageSize;
        if (this.state.users) {
            emptyRows = emptyRows - this.state.users.length;
        }

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                    <Typography variant="h3">
                        Registered Users
                    </Typography>
                    <div className={classes.tableWrapper}>
                        <Table
                            className={classes.table}
                            aria-labelledby="Users"
                        >
                            <UserTableHead
                                headRows={this.headRows}
                                order={this.state.order}
                                orderBy={this.state.orderBy}
                                onRequestSort={this.handleRequestSort}
                            />
                            <TableBody>
                                {//stableSort(rows, getSorting(order, orderBy))
                                    //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    this.state.users.map((row, index) => {
                                        return (
                                            <TableRow
                                                hover
                                                //onClick={event => handleClick(event, row.name)}
                                                tabIndex={-1}
                                                key={row.username}
                                                component={Link} to={"/admin/" + row.username}
                                                className={classes.notDecorated}
                                            >

                                                <TableCell align="left">{row.username}</TableCell>
                                                <TableCell align="right">{row.firstName}</TableCell>
                                                <TableCell align="right">{row.lastName}</TableCell>
                                                <TableCell align="right">{row.country}</TableCell>
                                                <TableCell align="right">{row.address}</TableCell>
                                                <TableCell align="right">{row.email}</TableCell>
                                                <TableCell align="right">{row.verified ? <CheckBoxIcon /> : <CheckBoxBlankIcon />}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 49 * emptyRows }}>
                                        <TableCell colSpan={5} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <TablePagination
                        className={classes.pagination}
                        rowsPerPageOptions={[5,10,15]}
                        component="div"
                        count={this.state.totalUsers}
                        rowsPerPage={this.state.pageSize}
                        page={this.state.currPage}
                        backIconButtonProps={{
                            'aria-label': 'previous page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'next page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}

                    
                    />

                    <Typography component="div">
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
                    </Typography>
            </div>
        );
    }


}


export default withStyles(styles)(UserTable);