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
    <div className="w-4/5 flex flex-col items-center">
      <RouteStartForm setOriginCoordinates={setOriginCoordinates} setWaypointCoordinates={setWaypointCoordinates} />
      <MapContent waypointCoordinates={waypointCoordinates} originCoordinates={originCoordinates} isLoaded={isLoaded} />
    </div>
  )
}

export default MapContainer