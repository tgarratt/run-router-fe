import React, { useState } from "react";

import { useLoadScript } from '@react-google-maps/api';

import RouteStartForm from "./RouteStartForm";
import MapContent from "./MapContent"


function MapContainer(){
    const [originCoordinates, setOriginCoordinates] = useState()
    const [waypointCoordinates, setWaypointCoordinates] = useState()

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
    })

  return (
    <>
    <RouteStartForm setWaypointCoordinates={setWaypointCoordinates} setOriginCoordinates={setOriginCoordinates} isLoaded={isLoaded} />
    {!waypointCoordinates && <p>Please privide starting location...</p>}
    {waypointCoordinates && <MapContent waypointCoordinates={waypointCoordinates} originCoordinates={originCoordinates} isLoaded={isLoaded} />}
    </>
  )
}

export default MapContainer