import React, { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";

import { CsrfContext } from "../../context/CsrfContext";
import { AccountContext } from "../../context/AccountContext";

import { MessageContext } from "../../context/MessageContext";
import { Account, House, LogoWhite, ArrowDown, LogoBlack } from "../../media/icons";
import { ModalContext } from "../../context/ModalContext";


function Nav({theme = 'light'}){
  const csrfToken = useContext(CsrfContext);
  const accountQuery = useContext(AccountContext);
  const { setNotification } = useContext(MessageContext);
  const {setModal, setHeadingText, setOnConfirm, setConfirmDetails, setCancelDetails} = useContext(ModalContext);

  const logoutMutation = useMutation(() => axios.post('api/logout', null,
    {headers: {
      "X-CSRFToken": csrfToken
    }}
  ));

  const logOut = async() => {
    try{
      await logoutMutation.mutateAsync().then(() => {
        accountQuery.refetch();
        setModal(false);
        setNotification({text: 'you have been logged out', colour: 'bg-[#54E36C]'});
      });
    } catch(error){
      console.error('Logout failed:', error)
    }
  }

  const handleModal = () => {
    setHeadingText('Are you sure you would like to log out?')
    setOnConfirm(() => logOut);
    setConfirmDetails({text: 'CONFIRM', textColour: 'text-black' , bgColour: 'bg-[#54E36C]'})
    setCancelDetails({text: 'CANCEL', textColour: 'text-black' , bgColour: 'bg-[#ffffff]'})
    setModal(true);
  }

  return (
    <>
      <div className="flex w-full">
        <div className="mt-7 ml-7 mr-7">
          <Link to={'/'}>
          {theme === 'light' ? <LogoWhite /> : <LogoBlack />}
          </Link>
        </div>
        <div className={`${theme === 'light' ? 'bg-white text-black' : 'bg-[#0A1742] text-white'} rounded-b-md flex h-fit items-center ml-auto mr-4 md:mr-16 py-2`}>
          <Link to={'/'} className="flex items-center mx-2">
            <House colour={`${theme === 'light' ? '#000000' : '#ffffff'}`} />
            <p className="text-sm mx-2 hidden md:block">Home</p>
          </Link>
          {accountQuery.data?.authenticated &&
            <div className="flex flex-col group relative items-center mx-2">
              <div className="flex items-center">
                <img alt={"profile icon"} src={accountQuery.data.icon} style={{height: '35px', width: '35px'}} className="mr-2 md:mr-0" />
                <p className="text-sm mx-2 hidden md:block">{accountQuery.data.username}</p>
                <ArrowDown />
              </div>
              <div className={`group-hover:h-[8.5rem] h-[0rem] truncate duration-200 delay-200 absolute ${theme === 'light' ? 'bg-white text-black' : 'bg-[#0A1742] text-white'} top-8 px-2 rounded-b-md flex flex-col w-auto md:w-full left-[-16.5px] md:l-0`}>
                <Link to={'/account'} className="py-2 border-b-2 text-center border-[#54E36C]">Account</Link>
                <Link to={'/saved-routes'} className="py-2 border-b-2 text-center border-[#54E36C]">Your runs</Link>
                <button onClick={handleModal}>
                  <p className="cursor-pointer py-2 border-b-2 border-[#54E36C]">Log Out</p>
                </button>
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