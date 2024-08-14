import React, { useState, useContext } from 'react';

import { CsrfContext } from '../context/CsrfContext';

import { FormContainer, FormHeading, FormInput, SubmitButton, FormMessage, Form } from '../components/forms';


function PasswordResetEmail() {
    const [emailInput, setEmailInput] = useState('')
    const [isSent, setIsSent] = useState(false)

    const csrfToken = useContext(CsrfContext);

    const handleSubmitEmail = async(event) => {
        event.preventDefault();

        if(!emailInput){
          return
        }
    
        try{
          await fetch(`${process.env.REACT_APP_API_URL}/api/password-reset-email`,{
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
        } catch (error) {
          console.error('Error making the POST request:', error);
        }

        setIsSent(true);
    };

    return (
      <>
      <FormContainer>
        <FormHeading heading={'Reset Password'} />
          <Form onSubmit={handleSubmitEmail}>
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
          </Form>
        {isSent && 
          <FormMessage
            message={'If this email exists on our system, we will send a password reset link'}
          />
        }
      </FormContainer>
      </>
    )
}

export default PasswordResetEmail