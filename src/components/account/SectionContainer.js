import React from "react";


function SectionContainer({children}){
  return (
    <div className="w-4/5 lg:flex mt-2">
      <div className="w-6/12 flex flex-col justify-start">
        {children}
      </div>
    </div>
  )
}

export default SectionContainer