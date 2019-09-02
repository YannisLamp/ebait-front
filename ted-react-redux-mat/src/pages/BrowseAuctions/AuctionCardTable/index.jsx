import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Material
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
        height: '100%',
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

    const { auctions, pageSize, isLoading, currPage, totalAuctions } = props;
    const { handleChangePage, handleChangeItemsPerPage } = props;

    console.log('TOTAL AUCTIONS');
    console.log(totalAuctions);

    const classes = useStyles();
    return (
        <div className={classes.root}>
                {/* <PaperTitle
                    title='Browse Auctions'
                    suggestion={''}
                /> */}


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

                                <TablePagination
                                    className={classes.pagination}
                                    labelRowsPerPage="Auctions Per Page"
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
                                    onChangeRowsPerPage={handleChangeItemsPerPage}

                                />
                            </>
                        )
                    }

                </div>
        </div>
    );


}