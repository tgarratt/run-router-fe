import React from 'react';

import Nav from '../components/global/Nav';
import AccountSettings from '../components/account/AccountSettings';
import CustomizeProfile from '../components/account/CustomizeProfile';
import PersonalWelcome from '../components/account/PersonalWelcome';
import DeleteAccount from '../components/account/DeleteAccount';
import BgIconTwo from '../media/shapes/BgIconTwo';
import BgIconThree from '../media/shapes/BgIconThree';
import BgIconFour from '../media/shapes/BgIconFour';



function Account() {
    return (
        <div className='flex flex-col items-center w-full relative'>
            <Nav theme='dark' />
            <PersonalWelcome />
            <AccountSettings />
            <CustomizeProfile />
            <DeleteAccount />
            <div>
                <div className="absolute right-[0] bottom-[5%]"><BgIconFour /></div>
                <div className="absolute right-[25%] top-[40%]"><BgIconTwo colour='#0A1742' opacity={'1'} /></div>
                <div className="absolute right-[20%] top-[35%]"><BgIconThree /></div>
            </div>
        </div>    
    )
}

export default Account