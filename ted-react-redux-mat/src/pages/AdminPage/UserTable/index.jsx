import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Material
import { Grid, Paper, Button, Typography, 
    Table, TableBody, TableRow, TableCell, Checkbox, TablePagination } from '@material-ui/core';

import UserTableHead from './UserTableHead';

import { withStyles } from '@material-ui/core';
import styles from './styles';

import { usersApi } from '../../../services'


class UserTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            order: 'asc',
            orderBy: 'username',
            page: 0,
            users: [],
        };

        //this.handleChangePage = this.handleChangePage.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);

    }


    componentDidMount() {
        usersApi.getUsers()
            .then(data => {
                this.setState((prevState, props) => { 
                    return { 
                        users: data,
                        isLoading: false 
                    } 
                })
            });
    }

    headRows = [
        { id: 'username', right: false, disablePadding: true, label: 'Username' },
        { id: 'firstName', right: true, disablePadding: false, label: 'First Name' },
        { id: 'lastName', right: true, disablePadding: false, label: 'Last Name' },
        { id: 'email', right: true, disablePadding: false, label: 'Email' },
        { id: 'verified', right: true, disablePadding: false, label: 'Verified' },
    ];




    handleRequestSort(event, property) {
        const { order, orderBy } = this.state;
        const isDesc = orderBy === property && order === 'desc';
        this.setState((prevState, props) => { 
            return { 
                order: isDesc ? 'asc' : 'desc',
                orderBy: property
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

    // handleChangePage(event, newPage) {
    //     setPage(newPage);
    // }

    // handleChangeRowsPerPage(event) {
    //     setRowsPerPage(+event.target.value);
    //     setPage(0);
    // }


    render() {
        const rowsPerPage = 10;
        //const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.users.length - page * rowsPerPage);
        const emptyRows = rowsPerPage - this.state.users.length;
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
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
                                //onRequestSort={handleRequestSort}
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
                                                
                                                <TableCell align="left" padding="none">{row.username}</TableCell>
                                                <TableCell align="right">{row.firstName}</TableCell>
                                                <TableCell align="right">{row.lastName}</TableCell>
                                                <TableCell align="right">{row.email}</TableCell>
                                                <TableCell align="right">{row.email}</TableCell>
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
                        rowsPerPageOptions={[]}
                        component="div"
                        count={this.state.users.length}
                        //rowsPerPage={rowsPerPage}
                        page={this.state.page}
                        backIconButtonProps={{
                            'aria-label': 'previous page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'next page',
                        }}
                        //onChangePage={this.handleChangePage}
                        // onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        );
    }


}


export default withStyles(styles)(UserTable);