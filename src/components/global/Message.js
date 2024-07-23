import React from "react";


function Message({text, colour = 'bg-[#00ff00]'}){
  return (
    <div className={`fixed rounded w-fit top-5 left-0 right-0 mx-auto px-8 py-2 duration-500 animate-bounce ${colour}`}>
      {text}
    </div>
  )
}

export default Message