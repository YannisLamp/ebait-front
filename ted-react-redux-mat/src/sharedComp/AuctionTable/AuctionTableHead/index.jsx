import React from 'react';
import { Link } from 'react-router-dom';

// Material
import { TableHead, TableRow, TableCell, TableSortLabel, Typography, Switch, Grid } from '@material-ui/core';

// For importing my custom styles  
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    test: {
        marginTop: '100px',
        color: 'black',
    },
    blackColor: {
        color: 'black',
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
}));


export default function AuctionTableHead(props) {
    const { headRows, order, orderBy, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    const classes = useStyles();

    return (
        <TableHead>
            <TableRow>
                {/* <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell> */}
                {headRows.map(row => (
                    <TableCell
                        //className={classes.blackColor}
                        key={row.id}
                        align={row.right ? 'right' : 'left'}
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                    >
                        <TableSortLabel
                            className={classes.blackColor}
                            active={orderBy === row.id}
                            direction={order}
                            onClick={createSortHandler(row.id)}
                        >
                            {row.label}
                            {orderBy === row.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}