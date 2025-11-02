import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3002'); //PORT LISTEN OF SERVER

function App() {

  return (
    <>
    <p>hello</p>
    </>
  );
}

export default App;