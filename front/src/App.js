import React from 'react';
import Home from './components/main home/Home';
import Signup from './components/register/Register';
import Login from './components/login/Login';
import NotFound from './components/error/error';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
    );
};

export default App;