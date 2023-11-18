import React, { useState, useContext } from "react";
import axios from "axios";
import { useMutation } from "react-query";

import { CsrfContext } from "../../context/CsrfContext";
import { AccountContext } from "../../context/AccountContext";

function Nav(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [incorrectCredentials, setIncorrectCredentials] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const csrfToken = useContext(CsrfContext);
  const accountQuery = useContext(AccountContext);

  const logoutMutation = useMutation(() => axios.post('api/logout', null,
    {headers: {
      "X-CSRFToken": csrfToken
    }}
  ));

  const handleSubmit = async (event) => { 
    event.preventDefault();

    try{

      const response = await fetch('/api/login',{
        method: 'POST',
        headers: new Headers({
          "X-CSRFToken": csrfToken,
          "Content-Type": 'application/json'
        }),
        credentials: 'include',
        body: JSON.stringify({
          username: username,
          password: password,
        })
      })

      if(response.ok) {
        setIncorrectCredentials(false)
        setUsername('');
        setPassword('');
        accountQuery.refetch();
      }else {
        // Invalid credentials
        const data = await response.json();
        setIncorrectCredentials(true)
        console.error('Login failed:', data.error);

      }

    } catch (error) {
      console.error('Error making the POST request:', error);
    }

  }


  const logOut = async() => {
    try{
      await logoutMutation.mutateAsync().then(() => {
        accountQuery.refetch();
      });
    } catch(error){
      console.error('Logout failed:', error)
    }
  }

  return (
    <div style={{marginBottom: '30px', display: 'flex'}}>
    {accountQuery.data?.authenticated ? 
      <>
        <p onClick={logOut}>Log Out</p>
      </>
      :
      <div style={{display: 'flex', flexDirection:'column'}}>
        {incorrectCredentials && <p>those details are incorrect, please try again</p>}
        <div style={{display: 'flex'}}>
          <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'hide' : 'show'} password</p>
          <button type="submit">Log In</button>
          </form>
        </div>
      </div>
      
    }
    </div>
  )
}

export default Nav