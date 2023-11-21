import React, { useContext, useState } from "react";
import { CsrfContext } from "../../context/CsrfContext";

import * as turf from '@turf/turf';
import axios from "axios";

import RunRight from "../../media/RunRight";
import FormValid from "../../media/FormValid.js";
import FormInvalid from "../../media/FormInvalid";
import Search from "../../media/Search";
import TopRightArrow from "../../media/TopRightArrow";


function RouteStartForm({setOriginCoordinates, setWaypointCoordinates}){
  const [startLocation, setStartLocation] = useState('');
  const [totalDistance, setTotalDistance] = useState(0);

  const [startLocationError, setStartLocationError] = useState(null);
  const [totalDistanceError, setTotalDistanceError] = useState(null);

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

    if(!startLocation && !totalDistance){
      setStartLocationError(true);
      setTotalDistanceError(true);
      return
    }
    if(!startLocation){
      setStartLocationError(true);
      return
    }
    if(!totalDistance){
      setTotalDistanceError(true);
      return
    }

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
    <div className="bg-white w-11/12 rounded-t-2xl">
      <div className="grid grid-cols-8 grid-rows-3 mt-4 mx-16">
          <label className="row-start-1 row-end-1 col-span-3 flex items-center font-medium">Starting Location</label>
          <div className="row-start-2 row-end-2 col-span-3 flex items-center">
            <div className="flex w-2/3">
              <input
                type="text"
                id="startLocation"
                name="startLocation"
                value={startLocation}
                onChange={(e) => {
                  setStartLocation(e.target.value);
                  if(e.target.value) {
                    setStartLocationError(false);
                  }else{
                    setStartLocationError(true);
                  }
                }}
                placeholder="Address"
                required
                className="bg-slate-200 rounded-l-md p-2"
              />
              <div className="bg-slate-200 rounded-r-md p-2 mr-2 flex items-center">
                <Search />
              </div>
            </div>
            {startLocationError === false && <FormValid />}
            {startLocationError && <FormInvalid />}
          </div>
          {startLocationError && <div className="row-start-3 row-end-3 col-start-1 col-span-3 text-[#EE5757] mt-2">Field Required!</div>}
          <label className="row-start-1 row-end-1 col-span-2 flex items-center font-medium">Distance</label>
          <div className="flex row-start-2 row-end-2 col-span-2 items-center">
            <input
              type="number"
              id="totalDistance"
              name="totalDistance"
              min="1"
              max="30"
              value={totalDistance}
              onChange={(e) => {
                setTotalDistance(e.target.value)
                if(e.target.value) {
                  setTotalDistanceError(false);
                } else {
                  setTotalDistanceError(true);
                }
              }}
              required
              className="bg-slate-200 rounded-l-md p-2 w-1/2"
            />
            <div className="bg-slate-200 rounded-r-md p-2 mr-2">
              <p className="font-bold">km</p>
            </div>
            {totalDistanceError === false && <FormValid />}
            {totalDistanceError && <FormInvalid />}
        </div>
        {totalDistanceError && <p className="row-start-3 row-end-3 col-span-2 col-start-4 text-[#EE5757] mt-2">Field Required!</p>}
        <button type="submit" onClick={handleSubmit} className="row-start-2 row-end-2 col-span-3 mx-4 flex items-center justify-center">
          <div className="rounded-md bg-[#54E36C] w-full h-full flex items-center justify-center mr-1 relative font-medium text-lg max-w-[18rem]">
            <div className="absolute left-4" >
              <RunRight />
            </div>
            <p>Generate Route</p>
          </div>
          <div className="bg-slate-200 rounded-md h-full ml-1">
            <TopRightArrow />
          </div>
        </button>
      </div>
    </div>
  )
}

export default RouteStartForm