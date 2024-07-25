import React from 'react';

import Nav from '../components/global/Nav';
import {BackgroundImage, Intro, MapContainer, SignUpPush} from '../components/home';



function Home() {
    return (
        <BackgroundImage>
            <div className='flex flex-col items-center w-full'>
                <Nav />
                <Intro />
                <SignUpPush />
                <MapContainer />
            </div>    
        </BackgroundImage>
    )
}

export default Home