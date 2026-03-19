import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    // Connect to the specified URL. 
    // In production, you might want to use window.location.origin or an environment variable.
    socket = io('http://localhost:3000');
  }
  return socket;
}
