import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage'
import { Routes, Route, Link } from 'react-router';



function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Homepage />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;