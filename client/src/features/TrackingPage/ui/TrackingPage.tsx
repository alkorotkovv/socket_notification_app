import {FC, useEffect, useState} from 'react';
import {TrackingPageProps} from '../types'
import {io, Socket} from "socket.io-client";

const TrackingPage: FC<TrackingPageProps> = ({ component, uid, page_id }) => {

  // useSocketPage(uid, page_id);
  const CONST_WEBSOCKET_PAGE_URL = `http://localhost:3500/page_` + page_id;

  const [isPopupOpened, setIsPopupOpened] = useState(false)
  const [notification, setNotification] = useState({message: '', level: ''})

  useEffect(() => {

    console.log(page_id)

    const pageSocket: Socket = io(CONST_WEBSOCKET_PAGE_URL)

    // pageSocket.on('connect', () => {
    //   pageSocket.emit('session_start', { uid, page_id });
    // });

    pageSocket.on('notification', (data: { message: string, level: string }) => {
      setIsPopupOpened(true)
      setNotification({message: data.message, level: data.level})
    });

    return () => {
      // pageSocket.emit('session_end', { uid, page_id });
      pageSocket.disconnect();
    };
  }, []);

  return (
    <>
      {component}
    </>
  );
};

export default TrackingPage;