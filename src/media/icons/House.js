import React from 'react';


function House({colour = 'black'}) {

  return (
    <svg width="30" height="30" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.8335 30.625V13.125L17.5002 4.375L29.1668 13.125V30.625H20.4168V20.4167H14.5835V30.625H5.8335Z" fill={`${colour}`}/>
    </svg>
  );
}

export default House;