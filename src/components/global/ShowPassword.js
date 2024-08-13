import React from "react";


function ShowPassword({children, handleClick}){
  return (
    <div onClick={handleClick} className="absolute top-2 right-3">
      {children}
    </div>
  )
}

export default ShowPassword