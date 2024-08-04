import React, { memo } from "react";

import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';


const Map = memo(function Map({directions}){

  const containerStyle = {
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
    width: '100%',
    height: '700px',
    padding: '10px'
  };

  const defaultCenter = {
    lat: 53.746829,
    lng: -2.323147,
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={6}
      center={defaultCenter}
      id="googleMap"
    >
      {directions &&
        <DirectionsRenderer directions={directions} />
      }
    </GoogleMap>
  )
})

export default Map