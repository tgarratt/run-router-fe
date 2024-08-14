import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CsrfContext } from '../context/CsrfContext';
import { AccountContext } from '../context/AccountContext';

import { Nav } from '../components/global';
import {AccountSettings, CustomizeProfile, PersonalWelcome, DeleteAccount, BackgroundPattern} from '../components/account';




function Account() {
    const csrfToken = useContext(CsrfContext);
    const accountQuery = useContext(AccountContext);
    const navigate = useNavigate()

    useEffect(() => {
      if (accountQuery.data.authenticated !== true) {
        navigate("/");
        }
    },[accountQuery, navigate])
  
    const handleDeleteAccount = async() => {
      try{
        await fetch(`${process.env.REACT_APP_API_URL}/api/delete-account`,{
          method: 'POST',
          headers: new Headers({
            "X-CSRFToken": csrfToken,
            "Content-Type": 'application/json'
          }),
          credentials: 'include'
        })
        accountQuery.refetch();
        navigate('/');
      } catch (error) {
        console.error('Error making the POST request:', error);
      }
    }

    return (
      <div className='flex flex-col items-center w-full relative'>
          <Nav theme='dark' />
          <PersonalWelcome />
          <AccountSettings />
          <CustomizeProfile />
          <DeleteAccount handleDeleteAccount={handleDeleteAccount} />
          <BackgroundPattern />
      </div>
    )
}

export default Account