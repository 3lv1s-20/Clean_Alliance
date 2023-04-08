import React, {Component} from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';
import '../layout/Map.css';

const mapStyles = {
    width: '50%',
    height: '70%'
  };
  
  export class MapContainer extends Component {
    render() {
      return (
      
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          />
         
          );
  }}
  export default GoogleApiWrapper({
    apiKey: 'AIzaSyDMiIWpY4FRYumMZP2PGqyf-zEmHez4cCA'
  })(MapContainer);

 
  