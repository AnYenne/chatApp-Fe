import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage'
import { Routes, Route, Link } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute';



function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Homepage />} />
        </Route>
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;