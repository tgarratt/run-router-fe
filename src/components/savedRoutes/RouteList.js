import React, { useContext, useState } from "react";

import { CsrfContext } from "../../context/CsrfContext";
import { MessageContext } from "../../context/MessageContext";

import { Modal, ModalBackground } from "../global";
import SaveRouteForm from "./SaveRouteForm";
import { Delete, Edit } from "../../media/icons";
import ListHeart from "./ListHeart";



function RouteList({routeList, handleClick, selectedRoute, refetchRoutes, setDeleteId, setDeleteModal}){
  const [editRoute, setEditRoute] = useState(false)
  const [routeId, setRouteId] = useState()
  const [routeName, setRouteName] = useState('')
  const [routeDescription, setRouteDescription] = useState('')

  const csrfToken = useContext(CsrfContext);
  const { setNotification } = useContext(MessageContext);

  const handleFavoriteRoute = async(id, name, isFavorite) => {
    try{
      await fetch('/api/favorite-route',{
        method: 'POST',
        headers: new Headers({
          "X-CSRFToken": csrfToken,
          "Content-Type": 'application/json'
        }),
        credentials: 'include',
        body: JSON.stringify({
          routeId: id
        })
      })
      refetchRoutes();
      setNotification({text: `'${name}' has been ${isFavorite ? 'unfavorited' : 'favorited'}`, colour: 'bg-[#54E36C]'});

    } catch (error) {
      console.error('Error making the POST request:', error);
    }
  }

  const handleEditRoute = async(id, name) => {
    try{
      await fetch('/api/edit-route',{
        method: 'POST',
        headers: new Headers({
          "X-CSRFToken": csrfToken,
          "Content-Type": 'application/json'
        }),
        credentials: 'include',
        body: JSON.stringify({
          routeId: id,
          name: routeName,
          description: routeDescription
        })
      })
      refetchRoutes();
      setNotification({text: `'${name}' has been updated!`, colour: 'bg-[#54E36C]'});
      setEditRoute(false);
    } catch (error) {
      console.error('Error making the POST request:', error);
    }
  }

  const switchSelected = (id) => {
    if(selectedRoute !== id){
      return handleClick(id)
    }
    return null
  }

  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  }

  const toggleModal = (id) => {
    setRouteId(id)
    setRouteName(routeList.find(route => route.id === id).name || '')
    setRouteDescription(routeList.find(route => route.id === id).description || '')
    setEditRoute(true)
  }


  return (
    <>
      {/* handle modal individually for more complex actions */}
      {editRoute && 
      <>
        <ModalBackground handleClick={setEditRoute} />
        <Modal
        onConfirm={() => {handleEditRoute(routeId, routeName)}}
        toggleModal={setEditRoute}
        valid={routeName.length <= 25 && routeDescription.length <= 100}
        headingText={`Edit '${routeName}'!`}
        confirmDetails={{text: 'SAVE', textColour: 'text-black' , bgColour: 'bg-[#54E36C]'}}
        cancelDetails={{text: 'CANCEL', textColour: 'text-black' , bgColour: 'bg-[#ffffff]'}}>
          <SaveRouteForm setRouteName={setRouteName} routeName={routeName} setRouteDescription={setRouteDescription} routeDescription={routeDescription} />
        </Modal>
      </>
      }
      <div className="text-black flex flex-col p-4 rounded-lg bg-[#EBEBEB] overflow-y-scroll max-h-72 md:max-h-[700px] md:h-[700px]">
        {selectedRoute && routeList.map((route, key) => {
          return (
            <div key={key} className={`${selectedRoute === route.id ? 'bg-[#0A1741]' : 'bg-white'} rounded-lg mb-2 relative`}>
              <div className="absolute top-4 md:top-2 xl:top-4 right-2 flex">
                <button onClick={() => {toggleModal(route.id)}}>
                {(selectedRoute === route.id && <Edit stroke={'white'} />) || (selectedRoute !== route.id && <Edit />)}
                </button>
                <button onClick={() => {handleDelete(route.id)}} className="mx-2">
                  <Delete width="20" height="20" />
                </button>
                <button onClick={() => handleFavoriteRoute(route.id, route.name, route.isFavorite)}>
                  <ListHeart isFavorite={route.isFavorite} selectedRoute={selectedRoute} currentId={route.id} />
                </button>
              </div>
            <button className="w-full p-4 w-3/4 md:w-full xl:w-3/4"  onClick={() => {switchSelected(route.id)}}>
                <div className="flex pt-0 md:pt-4 xl:pt-0">
                  <p className={`${selectedRoute === route.id ? 'text-white' : 'text-[#0A1741]'} text-base md:text-lg lg:text-xl text-left break-all pr-4`}>{route.name}</p>
                  <p className="md:ml-0 xl:ml-4 text-sm text-[#868891] self-center w-20 md:w-auto xl:w-20 text-left">{route.distance}</p>
                </div>
                <p className="text-[#868891] text-sm text-left mb-2 w-full break-all">{route.description}</p>
            </button>
            </div>
          )})}
      </div>
    </>
  )
}

export default RouteList