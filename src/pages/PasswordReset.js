import React, { useState, useContext, useEffect } from 'react';

import { Link, useSearchParams } from 'react-router-dom';
import { CsrfContext } from '../context/CsrfContext';
import { FormContainer, FormHeading, FormInput, FormLink, SubmitButton } from '../components/formPages';
import { AccountContext } from '../context/AccountContext';
import { ToggleHidePassword, ToggleShowPassword } from "../media/icons";
import FormMessage from '../components/formPages/FormMessage';


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

    const handleUpdatePassword = async(event) => {
        if(!password1 || !password2 && password1 !== password2){
          return
        }
        
        event.preventDefault(); 
        
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
      return <FormMessage message={'authenticating...'} />
    }

    return (
        <>
          <FormContainer>
            {authenticated ?
              <>
                <FormHeading heading={'Reset Password'} />
                <form onSubmit={handleUpdatePassword} className="flex flex-col">
                  <div className="relative">
                    <FormInput
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
                    <FormInput
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
                  {message ? <FormMessage message={message} /> : 
                    <>
                      {!password1 || password1 !== password2 ? 
                          <SubmitButton text={'Passwords do not match'} disabled={true} />
                      :
                          <SubmitButton text={'Update Password'} />
                      }
                    </>
                  }
                </form>
            </>
            : <FormMessage message={'Unauthenticated, please try again'} />}
            <FormLink text={'Log in'} to={'/login'} />
          </FormContainer>

        </>
    )
}

export default PasswordReset