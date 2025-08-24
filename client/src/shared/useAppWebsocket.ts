import { useContext } from 'react';
import { WebSocketContext } from '../providers/Websocket/WebSocketProvider';

export const useAppWebsocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useAppWebsocket must be used within a WebSocketProvider');
  }
  return context;
};