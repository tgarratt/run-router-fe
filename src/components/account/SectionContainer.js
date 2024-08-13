import React from "react";


function SectionContainer({children}){
  return (
    <div className="w-4/5 lg:flex mt-2 z-10">
      <div className="w-5/5 md:w-1/2 flex flex-col justify-start">
        {children}
      </div>
    </div>
  )
}

export default SectionContainer