import React, { useContext, useEffect, useRef, useState } from "react";

import { CsrfContext } from "../../context/CsrfContext";
import { AccountContext } from "../../context/AccountContext";

import { Pencil, Tick, Cross } from "../../media/icons";


function CustomizeProfile(){
  const [ usernameDisabled, setUsernameDisabled ] = useState(true);
  const [ newNickname, setNewNickname ] = useState('');

  const csrfToken = useContext(CsrfContext);
  const accountQuery = useContext(AccountContext);
  const inputRef = useRef();

  useEffect(() => {
    setNewNickname(accountQuery.data.username);

    if (!usernameDisabled) {
      inputRef.current.focus();
    }

  },[accountQuery, usernameDisabled, inputRef])

  const handleUpdateNickname = async() => {
    try{
      await fetch('/api/update-account',{
        method: 'POST',
        headers: new Headers({
          "X-CSRFToken": csrfToken,
          "Content-Type": 'application/json'
        }),
        credentials: 'include',
        body: JSON.stringify({
          nickname: newNickname
        })
      })
        .then(accountQuery.refetch())
    } catch (error) {
      console.error('Error making the POST request:', error);
    }
  }

  const cancelEdit = () => {
    setUsernameDisabled(true);
    setNewNickname(accountQuery.data.username);
  }


  return (
    <div className="w-4/5 lg:flex mt-2">
      <div className="w-6/12 flex flex-col justify-start">
        <h2 className="text-[#868891] mb-2">Customize Profile</h2>
        <div className="bg-gradient-to-r from-[#4A6BE2] to-[#98CBE1] h-[2px] w-full"></div>
        <div className="flex flex-col mt-6 mb-12">
          <div className="flex flex-col mt-2 mb-4">
            <label htmlFor="username" className="mb-2 font-medium">Display Name</label>
            <div className="flex">
              <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="username"
                  aria-label="username"
                  ref={inputRef}
                  value={newNickname}
                  onChange={(e) => {setNewNickname(e.target.value)}}
                  disabled={usernameDisabled}
                  required
                  autoComplete="on"
                  className={`bg-slate-200 rounded-md my-2 mr-1 px-2 w-2/3 ${usernameDisabled && 'text-slate-500'}`}
              />
              {usernameDisabled && 
                <div className="bg-[#54E36C] rounded-md mr-2 mt-2 mb-2 p-1" onClick={() => {setUsernameDisabled(false)}}>
                  <Pencil />
                </div>
              }
              {!usernameDisabled && 
              <>
                <div className="bg-[#EE5757] rounded-md mr-2 mt-2 mb-2 p-1" onClick={cancelEdit}>
                  <Cross />
                </div>
                <div className="bg-[#54E36C] rounded-md mr-2 mt-2 mb-2 p-1" onClick={() => {handleUpdateNickname()}}>
                  <Tick />
                </div>
              </>
              }
            </div>
          </div>
          <div className="flex flex-col my-2">
            <p className="mb-2 font-medium">Profile Icon</p>
            <div>
              icons here
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomizeProfile