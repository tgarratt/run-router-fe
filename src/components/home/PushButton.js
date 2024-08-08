import React from "react";
import { Link } from "react-router-dom";

import { TopRightArrow } from "../../media/icons";

function PushButton({buttonText, route, text}){

  return (
    <>
      <Link to={route} className="row-start-2 row-end-2 col-span-3 flex items-center justify-center mr-4">
        <div className="rounded-md bg-[#54E36C] w-full h-full flex items-center justify-center mr-1 text-lg min-w-[10rem]">
          <p className="text-black">{buttonText}</p>
        </div>
        <div className="bg-slate-200 rounded-md h-full ml-1">
          <TopRightArrow />
        </div>
      </ Link>
      <div className="flex items-center text-sm max-w-[12rem] text-[#CFCFCF]">
      <p>{text}</p>
    </div>
   </>
  )
}

export default PushButton