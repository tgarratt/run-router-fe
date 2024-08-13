import React, { useState } from "react";

import { ModalContext } from "../context/ModalContext";
import { Modal, ModalBackground } from "../components/global";

function ModalProvider ({children}){
  const [modal, setModal] = useState(false);
  const [headingtext, setHeadingText] = useState('');
  const [onConfirm, setOnConfirm] = useState(null);
  const [confirmDetails, setConfirmDetails] = useState({text: '', textColour: '' , bgColour: ''});
  const [cancelDetails, setCancelDetails] = useState({text: '', textColour: '' , bgColour: ''});


    return(
        <ModalContext.Provider value={{setModal, setHeadingText, setOnConfirm, setConfirmDetails, setCancelDetails}}>
            {modal && 
              <>
                <ModalBackground handleClick={setModal} />
                <Modal
                onConfirm={onConfirm}
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