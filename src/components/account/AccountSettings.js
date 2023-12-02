import React, { useContext, useEffect, useState } from "react";

import { CsrfContext } from "../../context/CsrfContext";
import { AccountContext } from "../../context/AccountContext";
import Pencil from "../../media/icons/Pencil";
import Tick from "../../media/icons/Tick";
import Cross from "../../media/icons/Cross";
import ToggleHidePassword from "../../media/icons/ToggleHidePassword";
import ToggleShowPassword from "../../media/icons/ToggleShowPassword";


function AccountSettings(){
  const [ emailDisabled, setEmailDisabled ] = useState(true);
  const [ newEmail, setNewEmail ] = useState('');
  const [ passwordInput, setPasswordInput ] = useState(false);
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [showPassword, setShowPassword] = useState(false)


  const csrfToken = useContext(CsrfContext);
  const accountQuery = useContext(AccountContext);

  useEffect(() => {
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


  // THIS PROCESS NEEDS REWORKING
  const handleUpdatePassword = async() => {
    if(!password1 || !password2 && password1 !== password2){
      return
    }

    try{
      await fetch('/api/update-account',{
        method: 'POST',
        headers: new Headers({
          "X-CSRFToken": csrfToken,
          "Content-Type": 'application/json'
        }),
        credentials: 'include',
        body: JSON.stringify({
          password: password1
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
            <p className="font-medium my-2">Password</p>
            {passwordInput ? 
              <>
                <div className="relative">
                  <input
                      type={showPassword ? "text" : "password"}
                      id="passwordOne"
                      name="passwordOne"
                      placeholder="Password"
                      aria-label="Password Input One"
                      value={password1}
                      onChange={(e) => setPassword1(e.target.value)}
                      required
                      autoComplete="on"
                      className="my-2 rounded-md pr-1 pl-2 pt-1 pb-1 w-full"
                  />
                  <div onClick={() => setShowPassword(!showPassword)} className="absolute top-2 right-3">
                  {showPassword ? <ToggleHidePassword /> : <ToggleShowPassword />}
                  </div>
                </div>
                <div className="relative row-start-3 row-span-1 col-start-2 col-span-1">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="passwordOne"
                        name="passwordOne"
                        placeholder="Password"
                        aria-label="Password Input One"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                        autoComplete="on"
                        className="my-2 rounded-md pr-1 pl-2 pt-1 pb-1 w-full"
                    />
                    <div onClick={() => setShowPassword(!showPassword)} className="absolute top-2 right-3">
                    {showPassword ? <ToggleHidePassword /> : <ToggleShowPassword />}
                    </div>
                </div>
                <p onClick={() => {handleUpdatePassword()}} className="row-start-4 row-span-1 col-start-2 col-span-1 underline font-bold pl-2">Update Password</p>
              </>
            :
              <p onClick={() => {setPasswordInput(true)}} className="underline font-bold my-2">Change Password</p>
            }
            
        </div>
      </div>
    </div>
  )
}

export default AccountSettings