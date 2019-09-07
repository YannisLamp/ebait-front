import React, { Component } from 'react';

// Material
import { Grid, Paper, Button } from '@material-ui/core';

// For importing my custom styles  
import { withStyles } from '@material-ui/core';
import { pageStyles } from '../pageStyles';

import Sidebar from '../../sharedComp/Sidebar';

//import { usersApi } from '../../services';
import { importXmlAuctionsApi } from '../../services';


const styles = theme => ({
    ...pageStyles(theme),
    pageWrapper: {
        marginTop: theme.spacing(12),
    },
    paper: {
        width: '100%',
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        marginBottom: theme.spacing(2),
        minHeight: '80vh',
        //height: '75vh',
    },
    input: {
        display: 'none',
    },
});


class ImportPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            xmls: [],

            isGettingUsers: false,
            usersGottenNum: 0,

            isCreatingUsers: false,
            usersCreatedNum: 0,

            isLoadingAuctions: false,
            auctionsCreatedNum: 0,
        };

        this.hasNewXml = this.hasNewXml.bind(this);
        //this.parse = this.parse.bind(this);


    }


    hasNewXml(event) {
        event.persist();
        console.log(event);
        //var reader = new FileReader();
        //reader.readAsText(inputXml);

        this.setState((prevState, props) => {
            const { xmls } = prevState;
            for (const xml of event.target.files) {
                //reader.readAsText(inputXml);
                xml.text()
                    .then(data => {
                        const xmlObject = importXmlAuctionsApi.parseXml(data);
                        xmls.push(xmlObject);
                    })
                //xmls.push(xml.text());
            }
            return {
                xmls: xmls,
            }
        });
    }

    parse = async () => {
        console.log(this.state.xmls);

        //this.setState((prevState, props) => { return { isGettingUsers: true } });
        const userArray = importXmlAuctionsApi.getUsersFromAuctions(this.state.xmls[0]);
        //this.setState((prevState, props) => { return { isGettingUsers: false, usersGottenNum: userMap.length } });

        //this.setState((prevState, props) => { return { isCreatingUsers: true } });
        const [jwtMap, userIdMap] = await importXmlAuctionsApi.createUsersFromArray(userArray);
        //this.setState((prevState, props) => { return { isCreatingUsers: false,  } });

        await importXmlAuctionsApi.verifyUsersFromIdMap(userIdMap);

        //const jwtMap = new Map();
        const itemIDToDesc = await importXmlAuctionsApi.createAuctionsFromParsed(this.state.xmls[0], jwtMap);

        await importXmlAuctionsApi.startAuctionsFromitemIDToDesc(itemIDToDesc);

        await importXmlAuctionsApi.placeBidsFromitemIDToDesc(itemIDToDesc);
    }


    render() {

        const { classes } = this.props;
        return (
            <Sidebar>
                <div className={classes.root}>
                    <Grid
                        className={classes.grid}
                        container
                        //alignItems="center"
                        justify="center"
                    >
                        <Grid
                            className={classes.pageWrapper}
                            item
                            lg={10}
                        >
                            <Paper className={classes.paper}>
                                <Grid container justify="center" alignItems="center">
                                    <Grid item xs={6}>
                                        <input
                                            accept="*.xml"
                                            className={classes.input}
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            onChange={this.hasNewXml}
                                        />
                                        <label htmlFor="contained-button-file">
                                            <Button variant="contained" component="span">
                                                Upload Xml
                                            </Button>
                                        </label>
                                        <br />

                                        <Button
                                            //className={classes.bottomButton}
                                            color="primary"
                                            type="submit"
                                            onClick={this.parse}
                                            size="large"
                                            variant="contained"
                                        >
                                            Parse xml
                                        </Button>
                                    </Grid>

                                        

                                </Grid>


                            </Paper>
                        </Grid>

                    </Grid>
                </div>
            </Sidebar>
        );
    }
}

const styledImportPage = withStyles(styles)(ImportPage);
export default styledImportPage;