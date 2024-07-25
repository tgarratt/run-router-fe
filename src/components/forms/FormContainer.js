import React from "react";

import { LogoWhite } from "../../media/icons";
import { BgIconOne, BgIconTwo, BgIconThree} from "../../media/shapes";


function FormContainer({children}){

  return (
    <div className='bg-gradient-to-b from-[#0B194B] to-[#040C20] min-h-screen min-w-max relative'>
        <div className="flex flex-col min-h-screen items-center max-w-[350px] ml-auto mr-auto mb-auto pt-20">
          <LogoWhite />
          <div className="w-full z-10 px-2">
          {children}
          </div>
        </div>  
        <div className="absolute bottom-0 h-[350px] w-[280px] md:h-[468px] md:w-[383px]"><BgIconOne /></div>
        <div className="absolute left-[25%] bottom-[30%]"><BgIconTwo colour='#54E36C' opacity={'0.18'} /></div>
        <div className="absolute left-[20%] bottom-[50%]"><BgIconThree /></div>
    </div>  
  )
}

export default FormContainer