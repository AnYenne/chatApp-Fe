import React, { useState, useEffect } from 'react';
import ChatFrame from './pages/ChatFrame';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Routes, Route, Link } from 'react-router';



function App() {

  return (
    <>
    {/* <Login /> */}
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
    </>
  );
}

export default App;