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


export default function MyAuctionsTable(props) {

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
                <PaperTitle
                    title='Browse Auctions'
                    suggestion={''}
                />


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
                                justify="flex-start"
                            >
                            {
                                auctions
                                .map((card, index) => {
                                    const imageUrl = card.photos[0] ? card.photos[0].fileDownloadUri : '';
                                    console.log(card);
                                    return (
                                        <Grid className={classes.card} item>
                                            <AuctionCard
                                                name={card.name}
                                                description={card.description}
                                                imageUrl={imageUrl}
                                            />
                                        </Grid>
                                    );
                                })

                            }
                            </Grid>

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
        </div>
    );


}