import React from "react";


function Modal({onConfirm, toggleModal, headingText, confirmDetails, cancelDetails, children, valid = true}){

  const checkValid = () => {
    if(valid){
      return onConfirm()
    }
    return null
  }

  return (
    <div className="fixed w-96 min-h-60 h-fit border-2 border-black bg-[#0A1742] rounded top-0 bottom-0 left-0 right-0 m-auto z-50 p-2">
      <div className="border-t border-b border-l border-r border-slate-100/[.30] h-full">
        <p className="text-white py-8 px-4 text-2xl text-center">{headingText}</p>
        {children}
        <div className="flex flex-row text-white justify-center bottom-0 m-4">
          <button onClick={checkValid} className={`${confirmDetails.textColour} ${confirmDetails.bgColour} p-2 rounded mx-2 ${valid ? 'curser-pointer' : 'cursor-not-allowed'}`}>{confirmDetails.text}</button>
          <button onClick={() => (toggleModal(false))} className={`${cancelDetails.textColour} ${cancelDetails.bgColour} p-2 rounded mx-2`}>{cancelDetails.text}</button>
        </div>
      </div>
    </div>
  )
}

export default Modal