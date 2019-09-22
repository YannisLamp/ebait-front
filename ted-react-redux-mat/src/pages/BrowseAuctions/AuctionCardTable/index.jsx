import React from 'react';

import {
    Grid, Paper, Button, Typography, CircularProgress,
    Table, TableBody, TableRow, TableCell, Checkbox, TablePagination, Switch
} from '@material-ui/core';

import { CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxBlankIcon } from '@material-ui/icons';

import PaperTitle from '../../../sharedComp/PaperTitle';
import AuctionCard from './AuctionCard';

import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        //height: '100%',
    },
    tableWrapper: {
        marginTop: theme.spacing(4),
        overflowX: 'auto',
    },
    notDecorated: {
        textDecoration: 'none',
    },
    card: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    pagination: {
        color: theme.palette.text.primary,
    }
}));


export default function AuctionCardTable(props) {
    const { withPagination } = props;
    const { auctions, pageSize, isLoading, currPage, totalAuctions } = props;
    const { handleChangePage, handleChangeItemsPerPage } = props;

    const pageSizeOptions = [10, 20, 50];

    const classes = useStyles();

    return (
        <div className={classes.root}>

            <div className={classes.tableWrapper}>
                {isLoading ? (
                    // <CircularProgress className={classes.progress} />
                    ''
                ) : (
                        <>
                            <Grid
                                style={{ height: "100%" }}
                                container
                                //direction="column" 
                                justify="center"
                            >
                                {
                                    auctions
                                        .map((auction, index) => {
                                            return (
                                                <Grid className={classes.card} key={index} item>
                                                    <AuctionCard
                                                        auction={auction}
                                                    />
                                                </Grid>
                                            );
                                        })

                                }
                            </Grid>
                            {withPagination ? (
                                <TablePagination
                                    className={classes.pagination}
                                    labelRowsPerPage="Auctions Per Page"
                                    rowsPerPageOptions={pageSizeOptions}
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
                                    onChangeRowsPerPage={handleChangeItemsPerPage}

                                />
                            ) : ''}
                        </>
                    )
                }

            </div>
        </div>
    );


}