import React from "react";

import { HeartEmpty, HeartFilled } from "../../media/icons";


function ListHeart({isFavorite, selectedRoute, currentId}){

  if(isFavorite){
    return  <HeartFilled />
  }
  else if(selectedRoute === currentId){
    return  <HeartEmpty stroke={'white'} />
  }
  return (
    <HeartEmpty />
  )
}

export default ListHeart