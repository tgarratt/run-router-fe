import React, { useState, useContext } from 'react';

import { CsrfContext } from '../context/CsrfContext';

import { FormContainer, FormHeading, FormInput, SubmitButton } from '../components/formPages';


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
      <FormContainer>
        <FormHeading heading={'Reset Password'} />
          <form onSubmit={handleSubmitEmail} className="flex flex-col">
            <FormInput
                type={"text"}
                id="email"
                name="email"
                placeholder="test@test.com"
                aria-label="Email Input"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                autoComplete="on"
                className="my-2 rounded-md pr-1 pl-2 pt-1 pb-1"
            />
            <SubmitButton text={'Send Reset Email'} />
          </form>
        {isSent && <p>Sent</p>}
      </FormContainer>
      </>
    )
}

export default PasswordResetEmail