import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CsrfContext } from "../../context/CsrfContext";
import { AccountContext } from "../../context/AccountContext";

import { Bin } from "../../media/icons";


function DeleteAccount(){
  const csrfToken = useContext(CsrfContext);
  const accountQuery = useContext(AccountContext);
  const navigate = useNavigate()

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
    <div className="w-4/5 lg:flex mt-2">
      <div className="w-6/12 flex flex-col justify-start">
        <h2 className="text-[#868891] mb-2">Delete Account</h2>
        <div className="bg-gradient-to-r from-[#4A6BE2] to-[#98CBE1] h-[2px] w-full"></div>
        <div className="flex items-center mt-6 mb-12">
          <Bin />
          <div className="text-[#EE5757]" onClick={handleDeleteAccount}>Delete Account</div>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccount