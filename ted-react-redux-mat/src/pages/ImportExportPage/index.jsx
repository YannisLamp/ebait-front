import React, { Component } from 'react';

// Material
import { Grid, Paper, Button } from '@material-ui/core';

// For importing my custom styles  
import { withStyles } from '@material-ui/core';
import { pageStyles } from '../pageStyles';

import Sidebar from '../../sharedComp/Sidebar';
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
    input: {
        display: 'none',
    },
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
                            <PaperTitle
                                title='Import Auctions'
                                suggestion={''}
                            />
                            <Grid className={classes.paperGrid} container direction="column" justify="space-between">
                                <Grid item>
                                    Step 0


                                    </Grid>


                                <Grid item alignContent="center">
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

                                    <Button
                                        color="primary"
                                        type="submit"
                                        onClick={this.parse}
                                        //size="large"
                                        variant="contained"
                                    >
                                        Parse xml
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
                            <PaperTitle
                                title='Export Auctions'
                                suggestion={''}
                            />
                            <Grid className={classes.paperGrid} container direction="column" justify="space-between">

                                <Button
                                    color="primary"
                                    type="submit"
                                    onClick={e => { this.export("xml") }}
                                    //size="large"
                                    variant="contained"
                                >
                                    Export xml
                                    </Button>

                                <Button
                                    color="primary"
                                    type="submit"
                                    onClick={e => { this.export("json") }}
                                    //size="large"
                                    variant="contained"
                                >
                                    Export json
                                    </Button>

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