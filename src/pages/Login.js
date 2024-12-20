import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { CsrfContext } from "../context/CsrfContext";
import { AccountContext } from "../context/AccountContext";
import { MessageContext } from "../context/MessageContext";

import { ToggleHidePassword, ToggleShowPassword } from "../media/icons";
import { Form, FormContainer, FormHeading, FormInput, FormLink, SubmitButton } from "../components/forms";
import { ShowPassword } from "../components/global";


function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [incorrectCredentials, setIncorrectCredentials] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const csrfToken = useContext(CsrfContext);
    const accountQuery = useContext(AccountContext);
    const { setNotification } = useContext(MessageContext);

    const navigate = useNavigate();


    useEffect(() => {
        if (accountQuery.data.authenticated) {
        navigate("/");
        }
    }, [accountQuery, navigate]);

    const handleSubmit = async (event) => { 
        event.preventDefault();

        try{

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`,{
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
                setNotification({text: 'you have been logged in', colour: 'bg-[#54E36C]'});
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
            <Form onSubmit={handleSubmit}>
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
                        type={showPassword === true ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Password"
                        aria-label="Password Input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="on"
                    />
                    {/* because is a function inside of the form?????  */}
                    <ShowPassword handleClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <ToggleHidePassword /> : <ToggleShowPassword />}
                    </ShowPassword>
                </div>
                {incorrectCredentials && <p className="text-[#EE5757] text-center ">Your username or password is incorrect!</p>}
                <SubmitButton text={'Login'} />
            </Form>
            <FormLink text={'Create an account'} to={'/signup'} />
            <FormLink text={'Forgotten Password'} to={'/password-reset'} />
        </FormContainer>
    )
}

export default Login