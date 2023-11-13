import React, { useState, useEffect } from "react"
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';



function MapContent({waypointCoordinates, originCoordinates, isLoaded}){
    const [directions, setDirections] = useState(null);

    const containerStyle = {
      width: '800px',
      height: '500px'
    };

    useEffect(() => {
      
      if (isLoaded && waypointCoordinates) {
        const directionsService = new window.google.maps.DirectionsService();

        const origin = { lat: originCoordinates[0], lng: originCoordinates[1] };
        const waypointValue =  { lat: waypointCoordinates[0], lng: waypointCoordinates[1] };
        const waypoint = { location: waypointValue, stopover: false };


        // Travel options: WALKING, BICYCLING
        directionsService.route(
          {
            origin: origin,
            destination: origin,
            waypoints: [waypoint],
            travelMode: window.google.maps.TravelMode.WALKING
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              setDirections(result);
            } else {
              console.error(`error fetching directions ${result}`);
            }
          }
        );
      }
    }, [waypointCoordinates, isLoaded])

    return isLoaded ? (
      <>
      {directions &&  <p>{directions.routes[0].legs[0].distance.text}</p>}
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={14}
        >
            {directions &&
                <DirectionsRenderer
                directions={directions}
                />
            }
        </GoogleMap>
      </>
    ) : <><p>Generating Route...</p></>
}

export default MapContent