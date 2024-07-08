import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { CsrfContext } from "../context/CsrfContext";
import { AccountContext } from "../context/AccountContext";

import { ToggleHidePassword, ToggleShowPassword} from "../media/icons";
import { FormContainer, FormHeading, FormInput, FormLink, SubmitButton } from "../components/forms";



function SignUp() {
const [username, setUsername] = useState('')
const [email, setEmail] = useState('')
const [password1, setPassword1] = useState('')
const [password2, setPassword2] = useState('')
const [chosenIcon, setChosenIcon] = useState(1)

const [showPassword, setShowPassword] = useState(false)

const csrfToken = useContext(CsrfContext);
const accountQuery = useContext(AccountContext);

const navigate = useNavigate();


useEffect(() => {
    if (accountQuery.data.authenticated) {
      navigate("/");
    }
  }, [accountQuery, navigate]);


const handleSubmit = async (event) => { 
    event.preventDefault();

    try{

        const response = await fetch('/api/signup',{
        method: 'POST',
        headers: new Headers({
            "X-CSRFToken": csrfToken,
            "Content-Type": 'application/json'
        }),
        credentials: 'include',
        body: JSON.stringify({
            username: username,
            email: email,
            password: password1,
            icon: chosenIcon
        })
        })

        if(response.ok) {
        setUsername('');
        setEmail('');
        setPassword1('');
        accountQuery.refetch();
        }else {
        const data = await response.json();
        console.error('Signup failed:', data.error);

        }

    } catch (error) {
        console.error('Error making the POST request:', error);
    }

    }

    return (
        <FormContainer>
            <FormHeading heading={'Sign up'} />
                <div>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <FormInput
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            aria-label="Username Input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="on"
                        />
                        <FormInput
                            type="text"
                            id="email"
                            name="email"
                            placeholder="E-Mail"
                            aria-label="email Input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="on"
                        />
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
                            />
                            <div onClick={() => setShowPassword(!showPassword)} className="absolute top-2 right-3">
                            {showPassword ? <ToggleHidePassword /> : <ToggleShowPassword />}
                            </div>
                        </div>
                        <div className="relative">
                            <FormInput
                                type={showPassword ? "text" : "password"}
                                id="passwordOne"
                                name="passwordOne"
                                placeholder="Confirm Password"
                                aria-label="Password Input Two"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                required
                                autoComplete="on"
                            />
                            <div onClick={() => setShowPassword(!showPassword)} className="absolute top-2 right-3">
                            {showPassword ? <ToggleHidePassword /> : <ToggleShowPassword />}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div onClick={() => {setChosenIcon(1)}} className={`bg-white px-2 ${chosenIcon === 1 && 'border-2 border-[#ff0000]'}`}>
                                <p>1</p>
                            </div>
                            <div onClick={() => {setChosenIcon(2)}} className={`bg-white px-2 ${chosenIcon === 2 && 'border-2 border-[#ff0000]'}`}>
                                <p>2</p>
                            </div>
                            <div onClick={() => {setChosenIcon(3)}} className={`bg-white px-2 ${chosenIcon === 3 && 'border-2 border-[#ff0000]'}`}>
                                <p>3</p>
                            </div>
                            <div onClick={() => {setChosenIcon(4)}} className={`bg-white px-2 ${chosenIcon === 4 && 'border-2 border-[#ff0000]'}`}>
                                <p>4</p>
                            </div>
                            <div onClick={() => {setChosenIcon(5)}} className={`bg-white px-2 ${chosenIcon === 5 && 'border-2 border-[#ff0000]'}`}>
                                <p>5</p>
                            </div>
                        </div>
                        <SubmitButton text={'Sign up'} />
                    </form>
                    <FormLink text={'Already have an account? Log In!'} to={'/login'} />
                </div>
        </FormContainer>

    )
}

export default SignUp