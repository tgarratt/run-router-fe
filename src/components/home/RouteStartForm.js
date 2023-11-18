import React, { useContext, useState } from "react";
import { CsrfContext } from "../../context/CsrfContext";

import * as turf from '@turf/turf';
import axios from "axios";

function RouteStartForm({setOriginCoordinates, setWaypointCoordinates}){
  const [startLocation, setStartLocation] = useState('');
  const [totalDistance, setTotalDistance] = useState(0);

  const csrfToken = useContext(CsrfContext);

  const geocodeStartLocation = (address) => {
    const geocoder = new window.google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          const coords = results[0].geometry.location;
          resolve(coords);
        } else {
          reject(status);
        }
      });
    });
  };


  const calculateLocationLatLng = (startLocation, distance) => {
    // Create a Turf.js point from the start location
    const point = turf.point([startLocation.lng, startLocation.lat]);

    // Generate a random bearing between 0 and 360
    const min = 1;
    const max = 361;
    const randomBearing = Math.random() * (+max - +min) + +min;

    const furthestDistance = distance / 5 * 1.8

    // Calculate a new point that is a specified km away from the start location
    const destination = turf.destination(point, furthestDistance, randomBearing, { units: 'meters' });


    // Extract the new latitude and longitude from the destination point
    const newLat = destination.geometry.coordinates[1];
    const newLng = destination.geometry.coordinates[0];

    return { lat: newLat, lng: newLng };
  };


  const handleSubmit = async () => { 

    const startLocationCoords = await geocodeStartLocation(startLocation);

    const totalDistanceMeters = totalDistance * 1000

    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

    try{
      await fetch('/api/route-data',{
        method: 'POST',
        headers: new Headers({
          "X-CSRFToken": csrfToken,
          "Content-Type": 'application/json'
        }),
        credentials: 'include',
        body: JSON.stringify({
          start: startLocation,
          maxRangePoint: calculateLocationLatLng({lat: startLocationCoords.lat(), lng: startLocationCoords.lng() }, totalDistanceMeters),
          range: totalDistanceMeters,
        })
      })
        .then(response => response.json())
        .then(data => {
          setWaypointCoordinates(data);
          setOriginCoordinates([startLocationCoords.lat(), startLocationCoords.lng()]);
        })
    } catch (error) {
      console.error('Error making the POST request:', error);
    }
  };


  return (
    <>
      <label>Starting location</label>
      <input
        type="text"
        id="startLocation"
        name="startLocation"
        value={startLocation}
        onChange={(e) => setStartLocation(e.target.value)}
        required
      />
      <label>Total Distance</label>
      <input
        type="number"
        id="totalDistance"
        name="totalDistance"
        min="1"
        max="30"
        value={totalDistance}
        onChange={(e) => setTotalDistance(e.target.value)}
        required
      />
      <button type="submit" onClick={handleSubmit}>Sumbit</button>
    </>
  )
}

export default RouteStartForm