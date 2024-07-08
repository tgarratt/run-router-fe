import React from "react";


function Modal({onConfirm, toggleModal, headingText, confirmDetails, cancelDetails}){
  return (
    <div className="absolute w-96 h-60 border-2 border-black bg-[#0A1742] rounded top-0 bottom-0 left-0 right-0 m-auto z-50 p-2">
      <div className="border-t border-b border-l border-r border-slate-100/[.30] h-full">
        <div>
          <p className="text-white py-8 px-4 text-2xl text-center">{headingText}</p>
        </div>
        <div className="flex flex-row text-white justify-center bottom-0">
          <button onClick={() => (onConfirm())} className={`${confirmDetails.textColour} ${confirmDetails.bgColour} p-2 rounded mx-2`}>{confirmDetails.text}</button>
          <button onClick={() => (toggleModal(false))} className={`${cancelDetails.textColour} ${cancelDetails.bgColour} p-2 rounded mx-2`}>{cancelDetails.text}</button>
        </div>
      </div>
    </div>
  )
}

export default Modal