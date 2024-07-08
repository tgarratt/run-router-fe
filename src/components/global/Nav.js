import React, { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";

import { CsrfContext } from "../../context/CsrfContext";
import { AccountContext } from "../../context/AccountContext";

import Modal from "./Modal";
import { Account, House, LogoWhite, ArrowDown, LogoBlack } from "../../media/icons";


function Nav({theme = 'light'}){
  const [logoutModal, setLogoutModal] = useState(false);

  const csrfToken = useContext(CsrfContext);
  const accountQuery = useContext(AccountContext);

  const logoutMutation = useMutation(() => axios.post('api/logout', null,
    {headers: {
      "X-CSRFToken": csrfToken
    }}
  ));

  const logOut = async() => {
    try{
      await logoutMutation.mutateAsync().then(() => {
        accountQuery.refetch();
      });
    } catch(error){
      console.error('Logout failed:', error)
    }
  }

  return (
    <>
      {logoutModal && 
        <Modal 
            onConfirm={logOut}
            toggleModal={setLogoutModal}
            headingText={'Are you sure you would like to log out?'}
            confirmDetails={{text: 'CONFIRM', textColour: 'text-black' , bgColour: 'bg-[#54E36C]'}}
            cancelDetails={{text: 'CANCEL', textColour: 'text-black' , bgColour: 'bg-[#ffffff]'}} /> 
      }
      <div className="flex w-full">
        <div className="mt-7 ml-7 mr-7">
          <Link to={'/'}>
          {theme === 'white' ? <LogoWhite /> : <LogoBlack />}
          </Link>
        </div>
        <div className={`${theme === 'light' ? 'bg-white text-black' : 'bg-[#0A1742] text-white'} rounded-b-md flex h-fit items-center ml-auto mr-16 py-2`}>
          <Link to={'/'} className="flex items-center mx-2">
            <House colour={`${theme === 'light' ? '#000000' : '#ffffff'}`} />
            <p className="text-sm mx-2">Home</p>
          </Link>
          {accountQuery.data?.authenticated &&
            <div className="flex flex-col group relative items-center mx-2">
              <div className="flex items-center">
                <Account />
                <p className="text-sm mx-2">{accountQuery.data.username}</p>
                <ArrowDown />
              </div>
              <div className={`group-hover:h-[8.5rem] h-[0rem] truncate duration-200 delay-200 absolute ${theme === 'light' ? 'bg-white text-black' : 'bg-[#0A1742] text-white'} top-8 w-full px-2 rounded-b-md flex flex-col`}>
                <Link to={'/account'} className="py-2 border-b-2 border-[#54E36C]">Account</Link>
                <Link to={'/saved-runs'} className="py-2 border-b-2 border-[#54E36C]">Your runs</Link>
                <p onClick={setLogoutModal} className="cursor-pointer py-2 border-b-2 border-[#54E36C]">Log Out</p>
              </div>
            </div>
          }
          {!accountQuery.data?.authenticated &&
            <div className="flex items-center mx-2">
              <Account />
              <Link to={'/login'} className="text-sm mx-2 cursor-pointer">Log in</Link>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default Nav