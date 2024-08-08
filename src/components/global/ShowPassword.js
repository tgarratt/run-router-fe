import React from "react";


function ShowPassword({children, handleClick}){
  return (
    <button onClick={handleClick} className="absolute top-2 right-3">
      {children}
    </button>
  )
}

export default ShowPassword