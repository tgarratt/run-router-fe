import React from 'react';
import MapContainer from '../components/home/MapContainer';
import SignUpPush from '../components/home/SignUpPush';
import Intro from '../components/home/Intro';
import Nav from '../components/global/Nav';
import runRouterBg from "../media/runRouterBg.png";



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