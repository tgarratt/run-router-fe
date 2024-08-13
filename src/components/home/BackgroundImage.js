import React from "react";

import runRouterBg from "../../media/runRouterBg.png";

function BackgroundImage({children}){

  return (
    <div style={{backgroundImage: `url(${runRouterBg})`}} className="bg-no-repeat bg-[#020A1E] bg-contain 2xl:bg-cover">
      {children}
    </div>
  )
}

export default BackgroundImage