import React, { createRef, Component } from 'react';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

export default function OpenStreetMap(props) {
  
    // this.handleClick = this.handleClick.bind(this);
    // // this.handleLocationFound = this.handleLocationFound.bind(this);
    // }

  //mapRef = createRef();

//   handleClick(e) {
//     //console.log(this.mapRef.current.props.zoom);
//     // const map = this.mapRef.current;
//     // if (map != null) {
//     //     map.leafletElement.locate();
//     // }
//     //console.log(e);
//     this.setState({
//         hasLocation: true,
//         latlng: e.latlng,
//         zoom: 18,
//     });
//   }

//   handleLocationFound(e) {
//     console.log('changed state, found location');
//     console.log(e);
    // this.setState({
    //   hasLocation: true,
    //   latlng: e.latlng,
    // })
//   }
    // Get height from props
    // For  <ContainerDimensions>
    //const style = { width: Math.floor(this.props.width), height: Math.floor(this.props.height)};
    
    const { select, hasLocation } = props; 

    let marker = null 
    if (!select || hasLocation) {
        console.log('OPENSTREETM AAAAAP');
        const { lat, lng } = props;
        marker = (
            <Marker position={{lat, lng}}>
                <Popup>Auction Location</Popup>
            </Marker>
        );
    } 

    
    
    const { lat, lng } = props;
    const { handleMapClick } = props;
    const style = { height: props.height}; 
    return (
    
        <Map 
            center={{lat, lng}}
            zoom={15} 
            onClick={select ? handleMapClick : null}
            // onLocationfound={this.handleLocationFound}
            //ref={this.mapRef}

            style={style}
        >
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />

            {marker}
        </Map>
    );
}

