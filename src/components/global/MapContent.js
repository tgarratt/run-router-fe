import React, { useState, useEffect, useContext } from "react"

import { CsrfContext } from "../../context/CsrfContext";
import { MessageContext } from "../../context/MessageContext";
import { AccountContext } from "../../context/AccountContext";

import { Map, Modal, ModalBackground } from "../global";
import { LogoBlack } from "../../media/icons";
import SaveRouteForm from "../savedRoutes/SaveRouteForm";


function MapContent({waypointCoordinates, originCoordinates, isLoaded}){
    const [directions, setDirections] = useState(null);
    const [saveModal, setSaveModal] = useState(false);
    const [routeName, setRouteName] = useState('');
    const [routeDescription, setRouteDescription] = useState('');

    const csrfToken = useContext(CsrfContext);
    const { setNotification } = useContext(MessageContext);
    const accountQuery = useContext(AccountContext);


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
    }, [waypointCoordinates, isLoaded, originCoordinates]);

    const saveRoute = async() => {
      try{
        await fetch('/api/save-route',{
          method: 'POST',
          headers: new Headers({
            "X-CSRFToken": csrfToken,
            "Content-Type": 'application/json'
          }),
          credentials: 'include',
          body: JSON.stringify({
            origin: { lat: originCoordinates[0], lng: originCoordinates[1] },
            waypoint: { lat: waypointCoordinates[0], lng: waypointCoordinates[1] },
            distance: directions.routes[0].legs[0].distance.text,
            name: routeName,
            description: routeDescription
          })
        })
        .then(() => {
          setSaveModal(false);
          setRouteName('');
          setRouteDescription('');
          setNotification({text: `Route has been saved`, colour: 'bg-[#54E36C]'});
        })
      } catch (error) {
        console.error('Error making the POST request:', error);
      }
    }

    return isLoaded ? (
      <>
        {/* handle modal individually for more complex actions */}
        {saveModal && 
          <>
            <ModalBackground handleClick={setSaveModal} />
            <Modal
              onConfirm={saveRoute}
              toggleModal={setSaveModal}
              valid={routeName.length <= 25 && routeDescription.length <= 100}
              headingText={'Name your route!'}
              confirmDetails={{text: 'SAVE', textColour: 'text-black' , bgColour: 'bg-[#54E36C]'}}
              cancelDetails={{text: 'CANCEL', textColour: 'text-black' , bgColour: 'bg-[#ffffff]'}}>
                <SaveRouteForm setRouteName={setRouteName} routeName={routeName} setRouteDescription={setRouteDescription} routeDescription={routeDescription} />
            </Modal>
          </>
        }
        <div className="w-full relative">
          {directions && 
            <div className="absolute z-10 top-12 left-2 sm:left-auto sm:right-2 mt-2 bg-white p-6 rounded-md border-2 border-[#4563CC] text-[#0A1741]">
              <div className="hidden sm:block">
                <LogoBlack />
              </div>
              <div className="flex sm:justify-between mt-0 sm:mt-4">
                <p className="text-[#777777]">Length &nbsp;</p>
                <p>{directions.routes[0].legs[0].distance.text}</p>
              </div>
              <div className="flex justify-between mt-4">
                <a className="underline flex" target="_blank" rel="noreferrer" href={`https://www.google.com/maps/dir/?api=1&travelmode=walking&dir_action=navigate&origin=${directions.request.destination.location.lat()},${directions.request.destination.location.lng()}&destination=${directions.request.destination.location.lat()},${directions.request.destination.location.lng()}&waypoints=${directions.request.waypoints[0].location.location.lat()},${directions.request.waypoints[0].location.location.lng()}`}>
                  <p className="hidden sm:block">Open in &nbsp;</p> GoogleMaps
                </a>
              </div>
              {accountQuery.data?.authenticated &&
                <div className="flex justify-between mt-4">
                  <button className="underline" onClick={() => {setSaveModal(true)}}>
                    Save Route
                  </button>
                </div>
              }

            </div>
          }
          <Map directions={directions} />
        </div>
      </>
    ) : <> </>
}

export default MapContent