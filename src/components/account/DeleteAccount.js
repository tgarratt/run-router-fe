import React from "react";

import { Bin } from "../../media/icons";


function DeleteAccount({toggleModal}){

  return (
    <div className="w-4/5 lg:flex mt-2">
      <div className="w-6/12 flex flex-col justify-start">
        <h2 className="text-[#868891] mb-2">Delete Account</h2>
        <div className="bg-gradient-to-r from-[#4A6BE2] to-[#98CBE1] h-[2px] w-full"></div>
        <button  onClick={() => {toggleModal(true)}} className="flex items-center mt-6 mb-12 cursor-pointer">
          <Bin />
          <div className="text-[#EE5757]">Delete Account</div>
        </button>
      </div>
    </div>
  )
}

export default DeleteAccount