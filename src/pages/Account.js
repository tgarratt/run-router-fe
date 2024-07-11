import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CsrfContext } from '../context/CsrfContext';
import { AccountContext } from '../context/AccountContext';

import Nav from '../components/global/Nav';
import Modal from '../components/global/Modal';
import BackgroundPattern from '../components/account/BackgroundPattern';
import {AccountSettings, CustomizeProfile, PersonalWelcome, DeleteAccount} from '../components/account';



function Account() {
    const [deleteModal, setDeleteModal] = useState(false);

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
        await fetch('/api/delete-account',{
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
        <>
            {deleteModal && 
                <Modal 
                    onConfirm={handleDeleteAccount}
                    toggleModal={setDeleteModal}
                    headingText={'Are you sure you would like to delete your account?'}
                    confirmDetails={{text: 'DELETE', textColour: 'text-white' , bgColour: 'bg-[#ff0000]'}}
                    cancelDetails={{text: 'CANCEL', textColour: 'text-black' , bgColour: 'bg-[#ffffff]'}} /> 
            }
            <div className='flex flex-col items-center w-full relative' onClick={() => (deleteModal ? setDeleteModal(false) : null)}>
                <Nav theme='dark' />
                <PersonalWelcome />
                <AccountSettings />
                <CustomizeProfile />
                <DeleteAccount toggleModal={setDeleteModal} />
                <BackgroundPattern />
            </div>
        </>  
    )
}

export default Account