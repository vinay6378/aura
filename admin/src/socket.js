import { io } from 'socket.io-client';

export function connectRealtime(token, handlers = {}) {
  const url = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000';
  const socket = io(url, {
    auth: { token },
    transports: ['websocket', 'polling']
  });

  socket.on('visitor:hit', handlers.onHit);
  socket.on('visitor:heartbeat', handlers.onHeartbeat);
  socket.on('lead:new', handlers.onLead);
  socket.on('event:new', handlers.onEvent);

  return socket;
}
