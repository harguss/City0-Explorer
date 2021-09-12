import React from 'react';
import Image from 'react-bootstrap/Image'

const key = process.env.REACT_APP_LOCATION_KEY
const staticMapUrl = 'https://maps.locationiq.com/v3/staticmap';

class Map extends React.Component {
  render() {
    let location = this.props.location;
    let src = `${staticMapUrl}?key=${key}&center=${location.lat},${location.lon}&zoom=13`;
    

    return(
      <div id='image-magnifier-container'>
        <Image id='mapImage' src={src} roundedCircle
        alt={`Map of ${location.display_name}`} />
        </div>
      )
    }
  }
  
  export default Map;
    



