import React from "react";
import TopRightArrow from "../../media/TopRightArrow";


function SignUpPush(){

  return (
    <div className="w-4/5 text-white flex justify-center mt-14 mb-20">
      <div className="w-11/12 flex justify-start">
      <button type="submit" className="row-start-2 row-end-2 col-span-3 flex items-center justify-center mr-4">
          <div className="rounded-md bg-[#54E36C] w-full h-full flex items-center justify-center mr-1 font-medium text-lg min-w-[10rem]">
            <p className="text-black">Sign up</p>
          </div>
          <div className="bg-slate-200 rounded-md h-full ml-1">
            <TopRightArrow />
          </div>
        </button>
      <div className="flex items-center text-sm max-w-[12rem] text-[#CFCFCF]">
        <p>Sign up to save and manage your favourite routes</p>
      </div>
      </div>
    </div>
  )
}

export default SignUpPush