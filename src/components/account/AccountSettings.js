import React, { useContext, useEffect, useRef, useState } from "react";

import { CsrfContext } from "../../context/CsrfContext";
import { AccountContext } from "../../context/AccountContext";

import { Pencil, Tick, Cross } from "../../media/icons";
import { useNavigate } from "react-router-dom";


function AccountSettings(){
  const [ emailDisabled, setEmailDisabled ] = useState(true);
  const [ newEmail, setNewEmail ] = useState('');


  const csrfToken = useContext(CsrfContext);
  const accountQuery = useContext(AccountContext);
  const inputRef = useRef();

  useEffect(() => {
    setNewEmail(accountQuery.data.email);

    if (!emailDisabled) {
      inputRef.current.focus();
    }

  },[accountQuery, emailDisabled, inputRef])

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
      .then(() => {
        accountQuery.refetch();
        setEmailDisabled(true);
      })
    } catch (error) {
      console.error('Error making the POST request:', error);
    }
  }

  const cancelEdit = () => {
    setEmailDisabled(true);
    setNewEmail(accountQuery.data.email);
  }

  return (
    <div className="w-4/5 lg:flex mt-2">
      <div className="w-6/12 flex flex-col justify-start">
        <h2 className="text-[#868891] mb-2">Account Settings</h2>
        <div className="bg-gradient-to-r from-[#4A6BE2] to-[#98CBE1] h-[2px] w-full"></div>
        <div className="flex flex-col mt-8 mb-12">
            <label htmlFor="email" className="font-medium my-auto">E-Mail Address</label>
            <div className="flex">
              <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="E-Mail"
                  aria-label="email Input"
                  ref={inputRef}
                  value={newEmail}
                  onChange={(e) => {setNewEmail(e.target.value)}}
                  required
                  disabled={emailDisabled}
                  autoComplete="on"
                  className={`bg-slate-200 rounded-md my-2 mr-1 px-2 w-2/3 ${emailDisabled && 'text-slate-500'}`}
              />
              {emailDisabled && 
                <button className="bg-[#54E36C] rounded-md mr-2 mt-2 mb-2 p-1" onClick={() => setEmailDisabled(false)}>
                  <Pencil />
                </button>
              }
              {!emailDisabled && 
              <>
                <button className="bg-[#EE5757] rounded-md mr-2 mt-2 mb-2 p-1" onClick={cancelEdit}>
                  <Cross />
                </button>
                <button className="bg-[#54E36C] rounded-md mr-2 mt-2 mb-2 p-1" onClick={() => {handleUpdateEmail()}}>
                  <Tick />
                </button>
              </>
              }
            </div>
        </div>
      </div>
    </div>
  )
}

export default AccountSettings