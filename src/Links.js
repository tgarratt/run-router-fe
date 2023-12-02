import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Account from './pages/Account';


const Links = () => {
    return (
        <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/login' element={<Login /> }></Route>
            <Route exact path='/signup' element={<SignUp /> }></Route>
            <Route exact path='/account' element={<Account /> }></Route>
        </Routes>
    )
}

export default Links;