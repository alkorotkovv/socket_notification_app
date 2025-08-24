import { useContext } from 'react';
import { WebSocketContext } from '@app/providers/Websocket/WebSocketProvider';

export const useAppWebsocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('Ошибка отсутсвия контекста для использования useAppWebsocket');
  }
  return context;
};