import React from 'react';

import Nav from '../components/global/Nav';
import runRouterBg from "../media/runRouterBg.png";
import {Intro, MapContainer, SignUpPush} from '../components/home';



function Home() {
    return (
        <div style={{backgroundImage: `url(${runRouterBg})`}} className="bg-no-repeat bg-contain bg-[#020A1E]">
        <div className='flex flex-col items-center w-full'>
            <Nav />
            <Intro />
            <SignUpPush />
            <MapContainer />
        </div>    
        </div>
    )
}

export default Home