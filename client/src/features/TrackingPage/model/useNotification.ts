// features/TrackingPage/model/useTrackingWebSocket.ts
import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import {CONST_WEBSOCKET_PAGE_BASE_URL} from '../model/constants';

export const useNotification = (page_id: number, uid: number) => {
  const [notification, setNotification] = useState({ message: '', level: '' });
  
  useEffect(() => {

    const pageSocket: Socket = io(CONST_WEBSOCKET_PAGE_BASE_URL + page_id);

    // pageSocket.on('connect', () => {
    //   pageSocket.emit('session_start', { uid, page_id });
    // });
    
    pageSocket.on('notification', (data: { message: string, level: string }) => {
      console.log('Получили уведомление')
      console.log(data)
      setNotification(data);
    });

    return () => {
      // pageSocket.emit('session_end', { uid, page_id });
      pageSocket.disconnect();
    };
  }, [page_id]);

  return notification;
};