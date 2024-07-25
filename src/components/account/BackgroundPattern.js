import React from "react";

import { BgIconFour, BgIconThree, BgIconTwo } from "../../media/shapes";


function BackgroundPattern(){
  return (
    <>
      <div className="absolute right-[0] bottom-[5%]"><BgIconFour /></div>
      <div className="absolute right-[25%] top-[40%]"><BgIconTwo colour='#0A1742' opacity={'1'} /></div>
      <div className="absolute right-[20%] top-[35%]"><BgIconThree /></div>
    </>
  )
}

export default BackgroundPattern