import React from 'react';


function BgIconTwo({colour, opacity}) {

  return (
    <svg width="155" height="155" viewBox="0 0 155 155" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="77.5" cy="77.5" r="77.5" transform="matrix(-1 0 0 1 155 0)" fill={`${colour}`} fillOpacity={`${opacity}`}/>
    </svg>
  );
}

export default BgIconTwo;