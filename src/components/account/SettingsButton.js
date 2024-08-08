import React from "react";


function SettingsButton({children, bgColour, handleClick}){

  return (
    <button className={`${bgColour} rounded-md mr-2 mt-2 mb-2 p-1`} onClick={handleClick}>
      {children}
    </button>
  )
}

export default SettingsButton