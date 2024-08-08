import React from "react";


function SectionHeading({children}){
  return (
    <>
      <h2 className="text-[#868891] mb-2">{children}</h2>
      <div className="bg-gradient-to-r from-[#4A6BE2] to-[#98CBE1] h-[2px] w-full" />
    </>
  )
}

export default SectionHeading