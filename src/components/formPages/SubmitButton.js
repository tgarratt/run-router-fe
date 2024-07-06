import React from "react";

import { TopRightArrow } from "../../media/icons";


function SubmitButton({text}){

  return (
    <button type="submit" className="row-start-2 row-end-2 col-span-3 flex items-center justify-center w-full my-4">
      <div className="rounded-md bg-[#54E36C] w-full h-full flex items-center justify-center mr-1 font-medium text-lg py-1">
          <p className="">{text}</p>
      </div>
      <div className="bg-slate-200 rounded-md ml-1">
          <TopRightArrow size="35" />
      </div>
    </button>
  )
}

export default SubmitButton