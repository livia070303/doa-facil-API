import type { Socket } from 'socket.io';

export function getSocketUser(socket: Socket) {
  return (socket.request as unknown as { user: any | { role: 'API' } }).user;
}
