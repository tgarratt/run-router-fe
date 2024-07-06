import React from 'react';

import Nav from '../components/global/Nav';
import { BgIconTwo, BgIconThree, BgIconFour } from '../media/shapes';
import {AccountSettings, CustomizeProfile, PersonalWelcome, DeleteAccount} from '../components/account';


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