import React, { useContext, useEffect, useRef, useState } from "react";

import { CsrfContext } from "../../context/CsrfContext";
import { AccountContext } from "../../context/AccountContext";

import { Pencil, Tick, Cross } from "../../media/icons";
import SettingsButton from "./SettingsButton";
import SectionHeading from "./SectionHeading";
import SectionContainer from "./SectionContainer";


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
      await fetch(`${process.env.REACT_APP_URL}/api/update-account`,{
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
    <SectionContainer>
      <SectionHeading>Account Settings</SectionHeading>
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
              <SettingsButton bgColour={'bg-[#54E36C]'} handleClick={() => setEmailDisabled(false)}>
                <Pencil />
              </SettingsButton>
            }
            {!emailDisabled && 
              <>
                <SettingsButton bgColour={'bg-[#EE5757]'} handleClick={cancelEdit}>
                  <Cross />
                </SettingsButton>
                <SettingsButton bgColour={'bg-[#54E36C]'} handleClick={() => {handleUpdateEmail()}}>
                  <Tick />
                </SettingsButton>
              </>
            }
          </div>
      </div>
    </SectionContainer>
  )
}

export default AccountSettings