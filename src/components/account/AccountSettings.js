import React, { useContext, useEffect, useState } from "react";

import { CsrfContext } from "../../context/CsrfContext";
import { AccountContext } from "../../context/AccountContext";

import { Pencil, Tick, Cross } from "../../media/icons";
import { useNavigate } from "react-router-dom";


function AccountSettings(){
  const [ emailDisabled, setEmailDisabled ] = useState(true);
  const [ newEmail, setNewEmail ] = useState('');


  const csrfToken = useContext(CsrfContext);
  const accountQuery = useContext(AccountContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (accountQuery.data.authenticated !== true) {
      navigate("/");
      }
    setNewEmail(accountQuery.data.email);
  },[])

  const handleUpdateEmail = async() => {
    try{
      await fetch('/api/update-account',{
        method: 'POST',
        headers: new Headers({
          "X-CSRFToken": csrfToken,
          "Content-Type": 'application/json'
        }),
        credentials: 'include',
        body: JSON.stringify({
          email: newEmail
        })
      })
      .then(accountQuery.refetch())
    } catch (error) {
      console.error('Error making the POST request:', error);
    }
  }

  return (
    <div className="w-4/5 lg:flex mt-2">
      <div className="w-6/12 flex flex-col justify-start">
        <h2 className="text-[#868891] mb-2">Account Settings</h2>
        <div className="bg-gradient-to-r from-[#4A6BE2] to-[#98CBE1] h-[2px] w-full"></div>
        <div className="grid grid-cols-2 grid-rows-4 mt-6">
            <label htmlFor="email" className="font-medium my-auto">E-Mail Address</label>
            <div className="flex">
              <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="E-Mail"
                  aria-label="email Input"
                  value={newEmail}
                  onChange={(e) => {setNewEmail(e.target.value)}}
                  required
                  disabled={emailDisabled}
                  autoComplete="on"
                  className="bg-slate-200 rounded-md p-2 my-2 mr-1 w-full"
              />
              {emailDisabled && 
                <div className="bg-[#54E36C] rounded-md mr-2 mt-2 mb-2 p-1" onClick={() => {setEmailDisabled(false)}}>
                  <Pencil />
                </div>
              }
              {!emailDisabled && accountQuery.data.email !== newEmail && 
                <div className="bg-[#54E36C] rounded-md mr-2 mt-2 mb-2 p-1" onClick={() => {handleUpdateEmail()}}>
                  <Tick />
                </div>
              }
              {!emailDisabled && accountQuery.data.email === newEmail && 
                <div className="bg-[#EE5757] rounded-md mr-2 mt-2 mb-2 p-1" onClick={() => {setEmailDisabled(true)}}>
                  <Cross />
                </div>
              }
            </div>
        </div>
      </div>
    </div>
  )
}

export default AccountSettings