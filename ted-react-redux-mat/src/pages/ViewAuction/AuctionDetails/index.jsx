import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Material
import {
    Grid, Paper, Button, Typography, CircularProgress,
    Table, TableBody, TableRow, TableCell, Checkbox, TablePagination, Switch
} from '@material-ui/core';

import { CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxBlankIcon } from '@material-ui/icons';

import PaperTitle from '../../../sharedComp/PaperTitle';


import { withStyles } from '@material-ui/core';

import { usersApi } from '../../../services'


const styles = theme => ({
    root: {
        width: '100%',
        height: 'inherit',
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
});


class UserTable extends Component {
    constructor(props) {
        super(props);


    }
    
    render() {
        const { users, order, orderBy, pageSize, isLoading, currPage, totalUsers } = this.props;
        const { changeUser, handleRequestSort, handleChangePage, handleChangeRowsPerPage} = this.props;


        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <PaperTitle
                    title=''
                    suggestion={''}
                />

                <div className={classes.tableWrapper}>
                    {isLoading ? (
                        // <CircularProgress className={classes.progress} />
                        ''
                    ) : (
                        <>
                            
                            
                           
                        </>
                    )
                    }

                </div>

            </div>
        );
    }

}


export default withStyles(styles)(UserTable);