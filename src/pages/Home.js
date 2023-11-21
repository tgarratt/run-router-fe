import React from 'react';
import MapContainer from '../components/home/MapContainer';
import SignUpPush from '../components/home/SignUpPush';
import Intro from '../components/home/Intro';


function Home() {
    return (
        <div className='flex flex-col items-center w-full'>
            <Intro />
            <SignUpPush />
            <MapContainer />
        </div>    
    )
}

export default Home