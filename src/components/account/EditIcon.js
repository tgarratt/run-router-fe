import React, { useContext, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

import { AccountContext } from "../../context/AccountContext";
import { CsrfContext } from "../../context/CsrfContext";


function EditIcon(){
  const [icons, setIcons] = useState([]);

  const csrfToken = useContext(CsrfContext);
  const accountQuery = useContext(AccountContext);

  useQuery({
    queryKey: ['icons'],
    queryFn: () => axios.get(`${process.env.REACT_APP_API_URL}/api/icons`, {
      withCredentials: true,
    }).then((res) => (
        res.data
    )),
    onSuccess: (data) => {
        setIcons(data.icons)
    }
  });

  const handleUpdateIcon = async(iconId) => {
    try{
      await fetch(`${process.env.REACT_APP_API_URL}/api/update-account`,{
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
  )
}

export default EditIcon