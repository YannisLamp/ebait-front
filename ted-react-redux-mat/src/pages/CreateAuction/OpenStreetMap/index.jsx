import React, { createRef, Component } from 'react';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";



export default class OpenStreetMap extends Component {
  constructor(props) {
    super(props);


    this.state = {
        hasLocation: false,
        latlng: {
          lat: this.props.lat,
          lng: this.props.lng,
        },
        zoom: 15,
    }

    

    this.handleClick = this.handleClick.bind(this);
    // this.handleLocationFound = this.handleLocationFound.bind(this);
  }



  mapRef = createRef();

  handleClick(e) {
    //console.log(this.mapRef.current.props.zoom);
    // const map = this.mapRef.current;
    // if (map != null) {
    //     map.leafletElement.locate();
    // }
    //console.log(e);
    this.setState({
        hasLocation: true,
        latlng: e.latlng,
        zoom: 18,
    });
  }

//   handleLocationFound(e) {
//     console.log('changed state, found location');
//     console.log(e);
    // this.setState({
    //   hasLocation: true,
    //   latlng: e.latlng,
    // })
//   }

  render() {
    // Get height from props
    const style = { width: Math.floor(this.props.width), height: Math.floor(this.props.height)};

    const marker = this.state.hasLocation ? (
        <Marker position={this.state.latlng}>
          <Popup>You are here</Popup>
        </Marker>
      ) : null

    
    return (
    
        <Map 
            center={this.state.latlng}
            zoom={this.state.zoom} 
            // length={4}
            onClick={this.handleClick}
            // onLocationfound={this.handleLocationFound}
            ref={this.mapRef}

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
}