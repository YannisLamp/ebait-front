import React, { Component } from 'react';

import {
    ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary,
    Typography, CircularProgress,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));


export default function MessageList(props) {
    //const { users, order, orderBy, pageSize, isLoading, currPage, totalUsers } = props;

    const classes = useStyles;
    return (
        <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading} style={{fontWeight: 'bold'}}>Expansion Panel 1</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography style={{fontWeight: 'bold'}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
          </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>Expansion Panel 2</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
          </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel disabled>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography className={classes.heading}>Disabled Expansion Panel</Typography>
                </ExpansionPanelSummary>
            </ExpansionPanel>
        </div>
    );
}





