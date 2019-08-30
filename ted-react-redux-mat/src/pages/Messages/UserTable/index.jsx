import React, { Component } from 'react';

// Material
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary,
    Typography, CircularProgress,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import { CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxBlankIcon } from '@material-ui/icons';

import PaperTitle from '../../../sharedComp/PaperTitle';

import { withStyles } from '@material-ui/core';


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

        //const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.users.length - page * rowsPerPage);
        let emptyRows = pageSize;
        if (this.props.users) {
            emptyRows = emptyRows - this.props.users.length;
        }

        const { classes } = this.props;

        return (
            <div className={classes.root}>

                <PaperTitle
                    title='Messages'
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