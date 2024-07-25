import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

import { CsrfContext } from "../../context/CsrfContext";
import { AccountContext } from "../../context/AccountContext";

import { Pencil, Tick, Cross } from "../../media/icons";


function CustomizeProfile(){
  const [ usernameDisabled, setUsernameDisabled ] = useState(true);
  const [ newNickname, setNewNickname ] = useState('');
  const [icons, setIcons] = useState([]);

  const csrfToken = useContext(CsrfContext);
  const accountQuery = useContext(AccountContext);
  const inputRef = useRef();

  useQuery({
    queryKey: ['icons'],
    queryFn: () => axios.get('api/icons').then((res) => (
        res.data
    )),
    onSuccess: (data) => {
        setIcons(data.icons)
    }
  });

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

  const handleUpdateIcon = async(iconId) => {
    try{
      await fetch('/api/update-account',{
        method: 'POST',
        headers: new Headers({
          "X-CSRFToken": csrfToken,
          "Content-Type": 'application/json'
        }),
        credentials: 'include',
        body: JSON.stringify({
          icon: iconId
        })
      })
      accountQuery.refetch()
    } catch (error) {
      console.error('Error making the POST request:', error);
    }
  }


  return (
    <div className="w-4/5 lg:flex mt-2">
      <div className="w-6/12 flex flex-col justify-start">
        <h2 className="text-[#868891] mb-2">Customize Profile</h2>
        <div className="bg-gradient-to-r from-[#4A6BE2] to-[#98CBE1] h-[2px] w-full"></div>
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
                <button className="bg-[#54E36C] rounded-md mr-2 mt-2 mb-2 p-1" onClick={() => {setUsernameDisabled(false)}}>
                  <Pencil />
                </button>
              }
              {!usernameDisabled && 
              <>
                <button className="bg-[#EE5757] rounded-md mr-2 mt-2 mb-2 p-1" onClick={cancelEdit}>
                  <Cross />
                </button>
                <button className="bg-[#54E36C] rounded-md mr-2 mt-2 mb-2 p-1" onClick={() => {handleUpdateNickname()}}>
                  <Tick />
                </button>
              </>
              }
            </div>
          </div>
          <div className="flex flex-col my-2">
            <p className="mb-2 font-medium">Profile Icon</p>
            <div className="flex">
                {icons.length > 0 &&
                    icons.map((icon, key) => (
                        <button key={key} className={`${accountQuery.data.icon === icon.source  ? 'border-black rounded-full' : 'border-transparent'} border-2 mr-2`} onClick={() => {handleUpdateIcon(icon.id)}}><img alt={`profile icon ${key}`} src={icon.source} style={{heigh: '100px', width: '50px'}} /></button>
                    ))
                }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomizeProfile