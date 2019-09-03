import React from 'react';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import { makeStyles } from '@material-ui/core/styles';

import PaperTitle from '../../../sharedComp/PaperTitle';
//import ContainerDimensions from 'react-container-dimensions'


const useStyles = makeStyles(theme => ({
    map: {
        // marginTop: theme.spacing(2),
        // marginBottom: theme.spacing(2),
    },
    mapHeight: {
        height: theme.spacing(47),
    }
}));


export default function CreateAuctionMap(props) {

    const { lat, lng } = props;
    console.log('LATATAT');
    console.log(lat);
    //const style = { height: '200px' };

    const classes = useStyles();
    return (
        <div>
            {/* <PaperTitle
                title='Auction Location'
            // suggestion={'or search for it'}
            /> */}

            {lat && lng ? (
                <div className={classes.map}>
                    <Map
                        center={{ lat: lat, lng: lng }}
                        zoom={15}
                        //style={style}
                        className={classes.mapHeight}
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        />

                        <Marker position={{ lat: lat, lng: lng }}>
                            <Popup>Auction Location</Popup>
                        </Marker>
                    </Map>
                </div>
            ) : null
            }

        </div>
    );

}