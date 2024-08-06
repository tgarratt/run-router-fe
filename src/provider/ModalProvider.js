import React, { useState } from "react";

import { ModalContext } from "../context/ModalContext";
import { Modal } from "../components/global";

function ModalProvider ({children}){
  const [modal, setModal] = useState(false);
  const [headingtext, setHeadingText] = useState('Are you sure you would like to log out?');
  const [onConfirm, setOnConfirm] = useState(null);
  const [confirmDetails, setConfirmDetails] = useState({text: 'CONFIRM', textColour: 'text-black' , bgColour: 'bg-[#54E36C]'});
  const [cancelDetails, setCancelDetails] = useState({text: 'CANCEL', textColour: 'text-black' , bgColour: 'bg-[#ffffff]'});


    return(
        <ModalContext.Provider value={{setModal, setHeadingText, setOnConfirm, setConfirmDetails, setCancelDetails}}>
            {modal && 
              <>
                <div style={{backgroundColor: 'black', opacity: '0.7', width: '100vw', height: '169vh', position: "absolute", zIndex: 200}} onClick={() => {setModal(false)}}/>
                <Modal
                onConfirm={() => (onConfirm)}
                headingText={headingtext}
                confirmDetails={confirmDetails}
                cancelDetails={cancelDetails} />
              </>
            }
            {children}
        </ModalContext.Provider>
    )
}

export default ModalProvider;