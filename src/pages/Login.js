import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { CsrfContext } from "../context/CsrfContext";
import { AccountContext } from "../context/AccountContext";

import { ToggleHidePassword, ToggleShowPassword } from "../media/icons";
import { FormContainer, FormHeading, FormInput, SubmitButton } from "../components/formPages";


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
            <FormHeading heading={'Log In'} />
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
                    className="my-2 rounded-md pr-1 pl-2 pt-1 pb-1"
                />
                <div className="relative">
                    <FormInput
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Password"
                        aria-label="Password Input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="on"
                    />
                    <div onClick={() => setShowPassword(!showPassword)} className="absolute top-2 right-3">
                    {showPassword ? <ToggleHidePassword /> : <ToggleShowPassword />}
                    </div>
                </div>
                {incorrectCredentials && <p className="text-[#EE5757] text-center ">Your username or password is incorrect!</p>}
                <SubmitButton text={'Login'} />
            </form>
            <div className="text-[#4A6BE2] text-center mt-3">
                <Link to="/signup">Create an account</Link>
            </div>
            <div className="text-[#4A6BE2] text-center mt-3">
                <Link to="/password-reset">Forgotten Password</Link>
            </div>
        </FormContainer>
    )
}

export default Login