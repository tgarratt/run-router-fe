import React from "react";

import BgIconOne from "../../media/shapes/BgIconOne";
import BgIconTwo from "../../media/shapes/BgIconTwo";
import BgIconThree from "../../media/shapes/BgIconThree";


function FormContainer({children}){

  return (
    <div className='bg-gradient-to-b from-[#0B194B] to-[#040C20] min-h-screen min-w-max relative'>
        <div className="flex flex-col min-h-screen items-center max-w-[350px] ml-auto mr-auto mb-auto pt-20">
            {children}
        </div>  
        <div className="absolute bottom-0 h-[350px] w-[280px] md:h-[468px] md:w-[383px]"><BgIconOne /></div>
        <div className="absolute left-[25%] bottom-[30%]"><BgIconTwo colour='#54E36C' opacity={'0.18'} /></div>
        <div className="absolute left-[20%] bottom-[50%]"><BgIconThree /></div>
    </div>  
  )
}

export default FormContainer