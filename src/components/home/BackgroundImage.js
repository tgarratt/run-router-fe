import React from "react";

import runRouterBg from "../../media/runRouterBg.png";

function BackgroundImage({children}){

  return (
    <div style={{backgroundImage: `url(${runRouterBg})`}} className="bg-no-repeat bg-contain bg-[#020A1E]">
      {children}
    </div>
  )
}

export default BackgroundImage