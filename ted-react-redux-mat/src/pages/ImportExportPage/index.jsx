import React, { Component } from 'react';

// Material
import { Grid, Paper, Button } from '@material-ui/core';

// For importing my custom styles  
import { withStyles } from '@material-ui/core';
import { pageStyles } from '../pageStyles';

import PaperTitle from '../../sharedComp/PaperTitle';

//import { usersApi } from '../../services';
import { importXmlAuctionsApi } from '../../services';
import { exportAuctionsApi } from '../../services';


const styles = theme => ({
    ...pageStyles(theme),
    importWrapper: {
        marginTop: theme.spacing(12),
        marginRight: theme.spacing(10),
    },
    exportWrapper: {
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
    paperGrid: {
        minHeight: '80vh',
    },
    input: {
        display: 'none',
    },
    importButton: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3),
        width: '100%',
    },
    exportButton: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3),
        width: '100%',
    }
});


class ImportExportPage extends Component {

    state = {
        xmls: [],

        isGettingUsers: false,
        usersGottenNum: 0,

        isCreatingUsers: false,
        usersCreatedNum: 0,

        isLoadingAuctions: false,
        auctionsCreatedNum: 0,

        isLoading: false,
        stage: 0,
    };

    hasNewXml = (event) => {
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

    export = (type) => {
        exportAuctionsApi.downloadAuctions(type)
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                if (type === 'json') {
                    link.setAttribute('download', 'auctions.json');
                }
                else if (type === 'xml') {
                    link.setAttribute('download', 'auctions.xml');
                }
                document.body.appendChild(link);
                link.click();
            })
    }


    render() {
        const { xmls } = this.state;

        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid
                    container
                    justify="center"
                >
                    <Grid
                        className={classes.importWrapper}
                        item
                        lg={5}
                    >
                        <Paper className={classes.paper}>
                            <Grid className={classes.paperGrid} container direction="column" justify="space-between">
                                <Grid item>
                                    <PaperTitle
                                        title='Import Auctions'
                                        suggestion={''}
                                    />
                                </Grid>

                                <Grid item alignContent="center">
                                    <input
                                        accept="*.xml"
                                        className={classes.input}
                                        id="contained-button-file"
                                        type="file"
                                        onChange={this.hasNewXml}
                                    />
                                    <label htmlFor="contained-button-file">
                                        <Button className={classes.importButton} variant="contained" component="span">
                                            Upload Xml File
                                        </Button>
                                    </label>

                                    <Button
                                        className={classes.importButton}
                                        color="primary"
                                        type="submit"
                                        onClick={this.parse}
                                        //size="large"
                                        variant="contained"
                                        disabled={xmls.length === 0}
                                    >
                                        Parse Xml File
                                    </Button>
                                </Grid>

                            </Grid>

                        </Paper>
                    </Grid>

                    <Grid
                        className={classes.exportWrapper}
                        item
                        lg={5}
                    >
                        <Paper className={classes.paper}>
                            <Grid className={classes.paperGrid} container direction="column" justify="space-between">

                                <Grid item>
                                    <PaperTitle
                                        title='Export Auctions'
                                        suggestion={''}
                                    />
                                </Grid>

                                <Grid item>
                                    <Button
                                        className={classes.exportButton}
                                        color="primary"
                                        type="submit"
                                        onClick={e => { this.export("xml") }}
                                        //size="large"
                                        variant="contained"
                                    >
                                        Export As Xml
                                    </Button>

                                    <Button
                                        className={classes.exportButton}
                                        color="primary"
                                        type="submit"
                                        onClick={e => { this.export("json") }}
                                        //size="large"
                                        variant="contained"
                                    >
                                        Export As Json
                                    </Button>

                                </Grid>

                            </Grid>

                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const styledImportPage = withStyles(styles)(ImportExportPage);
export default styledImportPage;