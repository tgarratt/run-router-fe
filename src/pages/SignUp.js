import React, { useState, useContext, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { CsrfContext } from "../context/CsrfContext";
import { AccountContext } from "../context/AccountContext";
import { FormContainer } from "../components/formPages";
import {LogoWhite, TopRightArrow, ToggleHidePassword, ToggleShowPassword} from "../media/icons";



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
            <div>
                <LogoWhite />
            </div>
            <div className="w-full z-10 px-2">
                <div className="text-white text-5xl font-medium flex justify-center mb-6 mt-28">
                    <h1>Sign Up</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            aria-label="Username Input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="on"
                            className="my-2 rounded-md pr-1 pl-2 pt-1 pb-1"
                        />
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="E-Mail"
                            aria-label="email Input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="on"
                            className="my-2 rounded-md pr-1 pl-2 pt-1 pb-1"
                        />
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
                        <div className="relative">
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
                        <div className="flex justify-between">
                            <div onClick={() => {setChosenIcon(1)}} className={`bg-white px-2 ${chosenIcon == 1 && 'border-2 border-[#ff0000]'}`}>
                                <p>1</p>
                            </div>
                            <div onClick={() => {setChosenIcon(2)}} className={`bg-white px-2 ${chosenIcon == 2 && 'border-2 border-[#ff0000]'}`}>
                                <p>2</p>
                            </div>
                            <div onClick={() => {setChosenIcon(3)}} className={`bg-white px-2 ${chosenIcon == 3 && 'border-2 border-[#ff0000]'}`}>
                                <p>3</p>
                            </div>
                            <div onClick={() => {setChosenIcon(4)}} className={`bg-white px-2 ${chosenIcon == 4 && 'border-2 border-[#ff0000]'}`}>
                                <p>4</p>
                            </div>
                            <div onClick={() => {setChosenIcon(5)}} className={`bg-white px-2 ${chosenIcon == 5 && 'border-2 border-[#ff0000]'}`}>
                                <p>5</p>
                            </div>
                        </div>
                        <button type="submit" disabled={password1 !== password2} onClick={handleSubmit} className="row-start-2 row-end-2 col-span-3 flex items-center justify-center w-full mt-4">
                            <div className="rounded-md bg-[#54E36C] w-full h-full flex items-center justify-center mr-1 font-medium text-lg py-1">
                                <p className="">Sign Up</p>
                            </div>
                            <div className="bg-slate-200 rounded-md ml-1">
                                <TopRightArrow size="35" />
                            </div>
                        </button>
                    </form>
                    <div className="text-[#4A6BE2] text-center my-6">
                        <Link to="/login">Already have an account? Log In!</Link>
                    </div>
                </div>
            </div>
        </FormContainer>

    )
}

export default SignUp