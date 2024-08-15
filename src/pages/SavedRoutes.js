import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useLoadScript } from '@react-google-maps/api';


import { CsrfContext } from '../context/CsrfContext';
import { AccountContext } from '../context/AccountContext';

import { MapContent, Modal, ModalBackground, Nav } from '../components/global';
import { Heading, RouteList } from '../components/savedRoutes';




function SavedRoutes() {
    const [routes, setRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);

    const csrfToken = useContext(CsrfContext);
    const accountQuery = useContext(AccountContext);

    const navigate = useNavigate()

    const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
    })

    useEffect(() => {
      if (accountQuery.data.authenticated !== true) {
        navigate("/");
        }
    },[accountQuery, navigate, routes])

    const query = useQuery({
      queryKey: ['savedRoutes'],
      queryFn: () => axios.get(`${process.env.REACT_APP_API_URL}/api/saved-routes`, {
        withCredentials: true,
      }).then((res) => (
          res.data
      )),
      onSuccess: (data) => {
        if(data.allRoutes.length > 0){
          const sortedData = data.allRoutes.sort((a, b) => b.isFavorite - a.isFavorite)
          setRoutes(sortedData)
          setSelectedRoute(sortedData[0].id)
        }
      }
    });

    const handleDeleteRoute = async() => {
      try{
        await fetch(`${process.env.REACT_APP_API_URL}/api/delete-route`,{
          method: 'POST',
          headers: new Headers({
            "X-CSRFToken": csrfToken,
            "Content-Type": 'application/json'
          }),
          credentials: 'include',
          body: JSON.stringify({
            routeId: deleteId
          })
        })

        if(deleteId === selectedRoute){
          setSelectedRoute(routes[0].id)
        }

        setDeleteModal(false);
        await query.refetch();
      } catch (error) {
        console.error('Error making the POST request:', error);
      }
    }

    return (
        <div className='flex flex-col items-center w-full relative'>
            <Nav theme='dark' />
            <div className='w-full ml-0 md:ml-12'>
              <Heading />
              {/* handle modal individually for more complex actions */}
              {deleteModal && deleteId &&
                <>
                <ModalBackground handleClick={setDeleteModal} />
                  <Modal
                      onConfirm={handleDeleteRoute}
                      toggleModal={setDeleteModal}
                      headingText={`Are you sure you would like to delete '${routes.find(route => route.id === deleteId).name}'`}
                      confirmDetails={{text: 'DELETE', textColour: 'text-white' , bgColour: 'bg-[#ff0000]'}}
                      cancelDetails={{text: 'CANCEL', textColour: 'text-black' , bgColour: 'bg-[#ffffff]'}} /> 
                </>
              }
              {query.isSuccess && routes.length > 0 &&
                <div className='flex flex-col md:flex-row'>
                  {console.log(query)}
                  <div className='w-[90%] md:w-[30%] mx-auto md:mr-0 xl:mr-16 mb-8'>
                    <RouteList routeList={routes} handleClick={setSelectedRoute} selectedRoute={selectedRoute} refetchRoutes={query.refetch} setDeleteId={setDeleteId} setDeleteModal={setDeleteModal} />
                  </div>
                  <div className='w-[90%] md:w-[60%] mx-auto'>
                    <MapContent waypointCoordinates={selectedRoute ? routes.find(item => item.id === selectedRoute).waypoint : routes[0].waypoint} originCoordinates={selectedRoute ? routes.find(item => item.id === selectedRoute).origin : routes[0].origin} isLoaded={isLoaded} />
                  </div>
                </div>
              }
              {query.isSuccess && routes.length <= 0 &&
                <div className='flex justify-center'>
                  <div className='text-black'>No routes found... create your own run <Link to="/" className='underline'>Here!</Link></div>
                </div>
              }
              {query.isLoading &&
                <div className='flex justify-center'>
                  <div className='text-black'>Loading...</div>
                </div>
              }
            </div>
        </div>
    )
}

export default SavedRoutes