import React, { useContext, useState } from "react";

import { CsrfContext } from "../../context/CsrfContext";
import { MessageContext } from "../../context/MessageContext";

import { Delete, HeartEmpty, HeartFilled, Edit } from "../../media/icons";
import Modal from "../global/Modal";
import SaveRouteForm from "./SaveRouteForm";


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
      {editRoute && 
        <Modal
        onConfirm={() => {handleEditRoute(routeId, routeName)}}
        toggleModal={setEditRoute}
        // valid={routeName && routeDescription.length <= 100}
        headingText={`Edit '${routeName}'!`}
        confirmDetails={{text: 'SAVE', textColour: 'text-black' , bgColour: 'bg-[#54E36C]'}}
        cancelDetails={{text: 'CANCEL', textColour: 'text-black' , bgColour: 'bg-[#ffffff]'}}>
          <SaveRouteForm setRouteName={setRouteName} routeName={routeName} setRouteDescription={setRouteDescription} routeDescription={routeDescription} />
        </Modal>
      }
      <div className="text-black flex flex-col p-4 rounded-lg bg-[#EBEBEB] h-full">
        {routeList.length > 0 && routeList.map((route, key) => {
          return selectedRoute ?
          <div className={`${selectedRoute === route.id ? 'bg-[#0A1741]' : 'bg-white'} rounded-lg mb-2 relative`}>
            <div className="absolute top-4 right-2 flex">
              <button onClick={() => {toggleModal(route.id)}}>
              {selectedRoute === route.id && <Edit stroke={'white'} /> || selectedRoute !== route.id && <Edit />}
              </button>
              <button onClick={() => {handleDelete(route.id)}} className="mx-2">
                <Delete width="20" height="20" />
              </button>
              <button onClick={() => handleFavoriteRoute(route.id, route.name, route.isFavorite)}>
                {route.isFavorite && <HeartFilled /> || selectedRoute === route.id && <HeartEmpty stroke={'white'} /> || selectedRoute !== route.id && <HeartEmpty />}
              </button>
            </div>
          <button className="w-full p-4"  onClick={() => {switchSelected(route.id)}}>
              <div className="flex">
                <p className={`${selectedRoute === route.id ? 'text-white' : 'text-[#0A1741]'} text-xl`}>{route.name}</p>
                <p className="ml-4 text-sm text-[#868891] self-center">{route.distance}</p>
              </div>
              <p className="text-[#868891] text-sm text-left mb-2 w-full break-all">{route.description}</p>
          </button>
          </div>
          :
          <div className={`${key === 0 ? 'bg-[#0A1741]' : 'bg-white'} rounded-lg mb-2 relative`}>
            <div className="absolute top-4 right-2 flex">
              <button onClick={() => {toggleModal(route.id)}}>
                {key === 0 && <Edit stroke={'white'} /> || selectedRoute !== route.id && <Edit />}
              </button>
              <button onClick={() => {handleDelete(route.id)}} className="mx-2">
                  <Delete width="20" height="20" />
              </button>
              <button onClick={() => handleFavoriteRoute(route.id, route.name, route.isFavorite)}>
                {route.isFavorite && <HeartFilled /> || key === 0 && <HeartEmpty stroke={'white'} /> || selectedRoute !== route.id && <HeartEmpty />}
              </button>
            </div>
          <button className="w-full p-4" onClick={() => {switchSelected(route.id)}}>
              <div className="flex">
                <p className={`${key === 0 ? 'text-white' : 'text-[#0A1741]'} text-xl`}>{route.name}</p>
                <p className="ml-4 text-sm text-[#868891] self-center">{route.distance}</p>
              </div>
              <p className="text-[#868891] text-sm text-left mb-2 w-full break-all">{route.description}</p>
          </button>
          </div>
        })}
      </div>
    </>
  )
}

export default RouteList