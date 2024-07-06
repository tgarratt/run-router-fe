import React, { useState, useContext } from 'react';
import { CsrfContext } from '../context/CsrfContext';


function PasswordResetEmail() {
    const [emailInput, setEmailInput] = useState('')
    const [isSent, setIsSent] = useState(false)

    const csrfToken = useContext(CsrfContext);

    const handleSubmitEmail = async() => {
        if(!emailInput){
          return
        }
    
        try{
          await fetch('/api/password-reset-email',{
            method: 'POST',
            headers: new Headers({
              "X-CSRFToken": csrfToken,
              "Content-Type": 'application/json'
            }),
            credentials: 'include',
            body: JSON.stringify({
              email: emailInput
            })
          })
          setIsSent(true)
        } catch (error) {
          console.error('Error making the POST request:', error);
        }
    };

    return (
      <>
        <div className="relative">
        <input
            type={"text"}
            id="email"
            name="email"
            placeholder="test@test.com"
            aria-label="Email Input"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            required
            autoComplete="on"
            className="my-2 rounded-md pr-1 pl-2 pt-1 pb-1 w-full"
        />
        </div>
        <p onClick={() => {handleSubmitEmail()}} className="row-start-4 row-span-1 col-start-2 col-span-1 underline font-bold pl-2">Email password reset form</p> 
        {isSent && <p>Sent</p>}
        </>
    )
}

export default PasswordResetEmail