import React, {useContext} from "react";

import { Bin } from "../../media/icons";
import { ModalContext } from "../../context/ModalContext";
import SectionHeading from "./SectionHeading";
import SectionContainer from "./SectionContainer";


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
    <SectionContainer>
      <SectionHeading>Delete Account</SectionHeading>
      <button  onClick={handleModal} className="flex items-center mt-6 mb-12 cursor-pointer">
        <Bin />
        <div className="text-[#EE5757]">Delete Account</div>
      </button>
    </SectionContainer>
  )
}

export default DeleteAccount