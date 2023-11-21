import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';


const Links = () => {
    return (
        <Routes>
            <Route exact path='/' element={<Home />}></Route>
        </Routes>
    )
}

export default Links;