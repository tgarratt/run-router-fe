import React, { useState, useContext, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { CsrfContext } from "../context/CsrfContext";
import { AccountContext } from "../context/AccountContext";

import LogoWhite from "../media/icons/LogoWhite";
import TopRightArrow from "../media/icons/TopRightArrow";
import ToggleHidePassword from "../media/icons/ToggleHidePassword";
import ToggleShowPassword from "../media/icons/ToggleShowPassword";
import FormContainer from "../components/formPages/FormContainer";



function Login() {
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [incorrectCredentials, setIncorrectCredentials] = useState(false)
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
        const data = await response.json();
        setIncorrectCredentials(true)
        console.error('Login failed:', data.error);

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
                    <h1>Log In</h1>
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
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Password"
                                aria-label="Password Input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="on"
                                className="my-2 rounded-md pr-1 pl-2 pt-1 pb-1 w-full"
                            />
                            <div onClick={() => setShowPassword(!showPassword)} className="absolute top-2 right-3">
                            {showPassword ? <ToggleHidePassword /> : <ToggleShowPassword />}
                            </div>
                        </div>
                        {incorrectCredentials && <p className="text-[#EE5757] text-center ">Your username or password is incorrect!</p>}
                        <button type="submit" onClick={handleSubmit} className="row-start-2 row-end-2 col-span-3 flex items-center justify-center w-full mt-4">
                            <div className="rounded-md bg-[#54E36C] w-full h-full flex items-center justify-center mr-1 font-medium text-lg py-1">
                                <p className="">Log In</p>
                            </div>
                            <div className="bg-slate-200 rounded-md ml-1">
                                <TopRightArrow size="35" />
                            </div>
                        </button>
                    </form>
                    <div className="text-[#4A6BE2] text-center my-6">
                        <Link to="/signup">Create an account</Link>
                    </div>
                </div>
            </div>
        </FormContainer>
    )
}

export default Login