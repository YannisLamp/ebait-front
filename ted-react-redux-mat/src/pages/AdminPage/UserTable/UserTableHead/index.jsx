import React from 'react';
import { Link } from 'react-router-dom';

// Material
import { TableHead, TableRow, TableCell, TableSortLabel, Table } from '@material-ui/core';

// For importing my custom styles  
import useStyles from './styles';

const headRows = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
    { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
    { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
    { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
    { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
  ];

export default function UserTableHead(props) {
    const { onSelectAllClick, order, orderBy, rowCount, onRequestSort } = props;
    const createSortHandler = property => event => {
      onRequestSort(event, property);
    };
    
    const classes = useStyles();

    return (
        <Table
                        className={classes.test}
                        aria-labelledby="tableTitle"
                        size='medium'
                    >
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
                className={classes.blackColor}
              key={row.id}
              align={row.numeric ? 'right' : 'left'}
              padding={row.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === row.id ? order : false} 
            >
              <TableSortLabel
              className={classes.blackColor}
                active={orderBy === row.id}
                direction={order}
                onClick={createSortHandler(row.id)}
              >
                {row.label}aaa
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
      </Table>
    );
  }