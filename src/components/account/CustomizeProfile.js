import React, { useContext, useEffect, useRef, useState } from "react";

import { CsrfContext } from "../../context/CsrfContext";
import { AccountContext } from "../../context/AccountContext";

import { Pencil, Tick, Cross } from "../../media/icons";
import SectionHeading from "./SectionHeading";
import SettingsButton from "./SettingsButton";
import EditIcon from "./EditIcon";
import SectionContainer from "./SectionContainer";


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
      });
      accountQuery.refetch()
      setUsernameDisabled(true);
    } catch (error) {
      console.error('Error making the POST request:', error);
    }
  }

  const cancelEdit = () => {
    setUsernameDisabled(true);
    setNewNickname(accountQuery.data.username);
  }

  return (
    <SectionContainer>
      <SectionHeading>Customize Profile</SectionHeading>
      <div className="flex flex-col mt-6 mb-8">
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
              <SettingsButton bgColour={'bg-[#54E36C]'} handleClick={() => setUsernameDisabled(false)}>
                <Pencil />
              </SettingsButton>
            }
            {!usernameDisabled && 
            <>
              <SettingsButton bgColour={'bg-[#EE5757]'} handleClick={cancelEdit}>
                <Cross />
              </SettingsButton>
              <SettingsButton bgColour={'bg-[#54E36C]'} handleClick={() => {handleUpdateNickname()}}>
                <Tick />
              </SettingsButton>
            </>
            }
          </div>
        </div>
        <EditIcon />
      </div>
    </SectionContainer>
  )
}

export default CustomizeProfile