import React, { useState, useEffect } from 'react';
import ChatFrame from './components/ChatFrame';



function App() {

  return (
    <div
    style={{width:'100%', minHeight:'800px'}}
    >
    <ChatFrame></ChatFrame>
    </div>
  );
}

export default App;