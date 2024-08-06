import React from "react";



function ModalBackground({handleClick}){

  return (
    <div className="bg-black opacity-70 w-screen h-screen fixed z-[300] top-0 left-0" onClick={() => {handleClick(false)}}/>
  )
}

export default ModalBackground