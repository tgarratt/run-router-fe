import React, { useState, useEffect } from "react"
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';


function MapContent({waypointCoordinates, originCoordinates, isLoaded}){
    const [directions, setDirections] = useState(null);

    const containerStyle = {
      borderTopLeftRadius: '16px',
      borderTopRightRadius: '16px',
      width: '100%',
      height: '700px',
      padding: '10px'
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
    }, [waypointCoordinates, isLoaded, originCoordinates])

    const defaultCenter = {
      lat: 53.746829,
      lng: -2.323147,
    };

    return isLoaded ? (
      <>
        {/* {directions && 
          <>
            <p>{directions.routes[0].legs[0].distance.text}</p>
            <div style={{display: 'flex'}}>
              <a target="_blank" rel="noreferrer" href={`https://www.google.com/maps/dir/?api=1&travelmode=walking&dir_action=navigate&origin=${directions.request.destination.location.lat()},${directions.request.destination.location.lng()}&destination=${directions.request.destination.location.lat()},${directions.request.destination.location.lng()}&waypoints=${directions.request.waypoints[0].location.location.lat()},${directions.request.waypoints[0].location.location.lng()}`}>
                Open in GoogleMaps
              </a>
            </div>
          </>
        } */}
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={6}
          center={defaultCenter}
        >
          {directions &&
              <DirectionsRenderer
              directions={directions}
              />
            }
        </GoogleMap>
      </>
    ) : <> </>
}

export default MapContent