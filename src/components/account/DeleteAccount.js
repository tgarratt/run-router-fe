import React, {useContext} from "react";

import { Bin } from "../../media/icons";
import { ModalContext } from "../../context/ModalContext";


function DeleteAccount({handleDeleteAccount}){
  const {setModal, setHeadingText, setOnConfirm, setConfirmDetails, setCancelDetails} = useContext(ModalContext);

  const handleModal = () => {
    setHeadingText('Are you sure you would like to delete your account?')
    setOnConfirm(() => handleDeleteAccount);
    setConfirmDetails({text: 'DELETE', textColour: 'text-white' , bgColour: 'bg-[#ff0000]'})
    setCancelDetails({text: 'CANCEL', textColour: 'text-black' , bgColour: 'bg-[#ffffff]'})
    setModal(true);
  }

  return (
    <div className="w-4/5 lg:flex mt-2">
      <div className="w-6/12 flex flex-col justify-start">
        <h2 className="text-[#868891] mb-2">Delete Account</h2>
        <div className="bg-gradient-to-r from-[#4A6BE2] to-[#98CBE1] h-[2px] w-full"></div>
        <button  onClick={handleModal} className="flex items-center mt-6 mb-12 cursor-pointer">
          <Bin />
          <div className="text-[#EE5757]">Delete Account</div>
        </button>
      </div>
    </div>
  )
}

export default DeleteAccount