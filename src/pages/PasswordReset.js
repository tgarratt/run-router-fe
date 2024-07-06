import React, { useState, useContext, useEffect } from 'react';
import { ToggleHidePassword, ToggleShowPassword } from "../media/icons";
import { CsrfContext } from '../context/CsrfContext';
import { AccountContext } from '../context/AccountContext';
import { useSearchParams } from 'react-router-dom';
import { FormContainer } from '../components/formPages';


function PasswordReset() {
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [message, setMessage] = useState(null)
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const [showPassword, setShowPassword] = useState(false)

    const [searchParams] = useSearchParams();
    console.log({'token': searchParams.get('t')});

    const validateToken = async() => {
      try{
        await fetch('/api/validate-token',{
          method: 'POST',
          headers: new Headers({
            "X-CSRFToken": csrfToken,
            "Content-Type": 'application/json'
          }),
          credentials: 'include',
          body: JSON.stringify({
            token: searchParams.get('t')
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log({tokenData: data.isTokenValid})
          setLoading(false)
          setAuthenticated(data.isTokenValid)
        })
        .then(accountQuery.refetch())
      } catch (error) {
        console.error('Error making the POST request:', error);
      }
    }

    useEffect(() => {
      validateToken();
    },[])

    const csrfToken = useContext(CsrfContext);
    const accountQuery = useContext(AccountContext);

    const handleUpdatePassword = async() => {
        if(!password1 || !password2 && password1 !== password2){
          return
        }
    
        try{
          await fetch('/api/password-reset-confirm',{
            method: 'POST',
            headers: new Headers({
              "X-CSRFToken": csrfToken,
              "Content-Type": 'application/json'
            }),
            credentials: 'include',
            body: JSON.stringify({
              password: password1,
              token: searchParams.get('t')
            })
          })
          .then(response => response.json())
          .then(data => {
            setMessage(data.message)
          })
          .then(accountQuery.refetch())
        } catch (error) {
          console.error('Error making the POST request:', error);
        }
    };

    if(loading){
      return <p>authenticating...</p>
    }

    return (
        <>
          <FormContainer>
            {authenticated ?
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
                    id="passwordTwo"
                    name="passwordTwo"
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
            {message ? <p>{message}</p> : 
            <>
              {!password1 || password1 !== password2 ? 
                  <p onClick={() => {handleUpdatePassword()}} className="row-start-4 row-span-1 col-start-2 col-span-1 underline font-bold pl-2">Passwords dont match</p>
              :
                  <p onClick={() => {handleUpdatePassword()}} className="row-start-4 row-span-1 col-start-2 col-span-1 underline font-bold pl-2">Update Password</p> 
              }
            </>
            }
            </>
            : <p>Unauthenticated</p>}
            </FormContainer>
        </>
    )
}

export default PasswordReset