import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import { CsrfContext } from "../context/CsrfContext";
import { AccountContext } from "../context/AccountContext";

import { ToggleHidePassword, ToggleShowPassword} from "../media/icons";
import { Form, FormContainer, FormHeading, FormInput, FormLink, SubmitButton } from "../components/forms";




function SignUp() {
    const [icons, setIcons] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [chosenIcon, setChosenIcon] = useState(1);

    const [showPassword, setShowPassword] = useState(false);

    const csrfToken = useContext(CsrfContext);
    const accountQuery = useContext(AccountContext);

    const navigate = useNavigate();

    const query = useQuery({
        queryKey: ['icons'],
        queryFn: () => axios.get(`${process.env.REACT_APP_API_URL}/api/icons`, {
            withCredentials: true,
        }).then((res) => (
            res.data
        )),
        onSuccess: (data) => {
            setIcons(data.icons)
        }
    });

    useEffect(() => {
        if (accountQuery.data.authenticated) {
            navigate("/");
        }
    }, [accountQuery, navigate]);


    const handleSubmit = async (event) => { 
        event.preventDefault();

        try{

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/signup`,{
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
            <>
                {query.isSuccess && 
                    <FormContainer>
                    <FormHeading heading={'Sign up'} />
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
                                <button onClick={() => setShowPassword(!showPassword)} className="absolute top-2 right-3">
                                {showPassword ? <ToggleHidePassword /> : <ToggleShowPassword />}
                                </button>
                            </div>
                            <div className="relative">
                                <FormInput
                                    type={showPassword ? "text" : "password"}
                                    id="passwordTwo"
                                    name="passwordTwo"
                                    placeholder="Confirm Password"
                                    aria-label="Password Input Two"
                                    value={password2}
                                    onChange={(e) => setPassword2(e.target.value)}
                                    required
                                    autoComplete="on"
                                />
                                <button onClick={() => setShowPassword(!showPassword)} className="absolute top-2 right-3">
                                {showPassword ? <ToggleHidePassword /> : <ToggleShowPassword />}
                                </button>
                            </div>
                            <div className="flex justify-between">
                                {icons.length > 0 &&
                                    icons.map((icon, key) => (
                                        <button key={key} type="button" className={`${chosenIcon === icon.id ? 'border-white rounded-full' : 'border-transparent'} border-2`} onClick={() => {setChosenIcon(icon.id)}}><img alt={`profile icon ${key}`} src={icon.source} style={{heigh: '100px', width: '50px'}} /></button>
                                    ))
                                }
                            </div>
                            <SubmitButton text={'Sign up'} />
                        </Form>
                        <FormLink text={'Already have an account? Log In!'} to={'/login'} />
                    </FormContainer>
                }
            </>
        )
}

export default SignUp