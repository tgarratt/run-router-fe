import React, { useContext, useState } from "react";

import { CsrfContext } from "../../context/CsrfContext";
import { MessageContext } from "../../context/MessageContext";

import * as turf from '@turf/turf';
import axios from "axios";

import { RunRight, FormValid, FormInvalid, Search, TopRightArrow } from "../../media/icons";


function RouteStartForm({setOriginCoordinates, setWaypointCoordinates}){
  const [startLocation, setStartLocation] = useState('');
  const [totalDistance, setTotalDistance] = useState(0);

  const [startLocationError, setStartLocationError] = useState(null);
  const [totalDistanceError, setTotalDistanceError] = useState(null);

  const csrfToken = useContext(CsrfContext);
  const { setNotification } = useContext(MessageContext);

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
    }).catch((error) => {
      console.log(error);
      setNotification({text: 'Address not found, please try again', colour: 'bg-[#EE5757]'});
    });
  ;
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

          document.getElementById('googleMap').scrollIntoView({behavior: 'smooth'})
        })
    } catch (error) {
      console.error('Error making the POST request:', error);
    }
  };


  return (
    <div className="bg-white w-full lg:w-11/12 rounded-t-2xl pb-4 relative bottom-[-1rem] lg:pb-0 lg:static lg:bottom-0">
      <div className="mt-4 mx-8 md:grid md:grid-cols-8 md:grid-rows-3 lg:mx-16 sm:flex sm:flex-col">
        <label htmlFor="startLocation" className="row-start-1 row-end-1 col-span-3 flex items-center font-medium">Starting Location</label>
        <div className="flex row-start-2 row-end-2 col-span-3 flex items-center md:mr-2">
          <div className="flex w-full lg:w-2/3">
            <input
              type="text"
              id="startLocation"
              name="startLocation"
              value={startLocation}
              placeholder="Address"
              aria-label="Address Input"
              onChange={(e) => {
                setStartLocation(e.target.value);
                if(e.target.value) {
                  setStartLocationError(false);
                }else{
                  setStartLocationError(true);
                }
              }}
              className="bg-slate-200 rounded-md p-2 w-full"
            />
            <div className="p-2 mr-2 flex items-center ml-[-2.5rem]">
              {!startLocation && <Search />}
            </div>
          </div>
          <div className="ml-2 lg:ml-6">
          {startLocationError === false && <FormValid />}
          {startLocationError && <FormInvalid />}
          </div>
        </div>
        {startLocationError && <div className="row-start-3 row-end-3 col-start-1 col-span-3 text-[#EE5757] mt-2">Field Required!</div>}
        <label htmlFor="totalDistance" className="row-start-1 row-end-1 col-span-2 flex items-center font-medium">Distance</label>
        <div className="flex row-start-2 row-end-2 col-span-2 items-center">
          <input
            type="number"
            id="totalDistance"
            name="totalDistance"
            min="1"
            max="30"
            value={totalDistance}
            aria-label="Distance Input"
            onChange={(e) => {
              if(e.target.value >= 30){
                setTotalDistance(30);
              }else{
                setTotalDistance(e.target.value);
              }
              if(e.target.value) {
                setTotalDistanceError(false);
              } else {
                setTotalDistanceError(true);
              }
            }}
            className="bg-slate-200 rounded-md p-2 w-full lg:w-2/3"
          />
          <div className="p-2 mr-2 flex items-center ml-[-3rem] lg:ml-[-4rem]">
            <p className="font-bold">km</p>
          </div>
          <div className="ml-2 lg:ml-6">
            {totalDistanceError === false && <FormValid />}
            {totalDistanceError && <FormInvalid />}
          </div>
        </div>
        {totalDistanceError && <p className="row-start-3 row-end-3 col-span-2 col-start-4 text-[#EE5757] mt-2">Field Required!</p>}
        <button type="submit" onClick={handleSubmit} className="row-start-2 row-end-2 col-span-3 my-4 md:my-0 mx-auto sm:mx-4 flex items-center justify-center h-10">
          <div className="rounded-md bg-[#54E36C] w-full h-full flex items-center justify-center mr-1 xl:relative font-medium text-md lg:text-lg max-w-[18rem]">
            <div className="mr-2 ml-2 xl:ml-0 xl:absolute lg:left-0 xl:left-4" >
              <RunRight />
            </div>
            <p className="mr-2 xl:mr-0">Generate Route</p>
          </div>
          <div className="bg-slate-200 rounded-md h-full ml-1 hidden xl:block">
            <TopRightArrow />
          </div>
        </button>
      </div>
    </div>
  )
}

export default RouteStartForm