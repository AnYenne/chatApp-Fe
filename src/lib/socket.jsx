import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3002'); //PORT LISTEN OF SERVER


export default socket;
