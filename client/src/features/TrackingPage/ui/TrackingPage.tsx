import {FC, useEffect, useState} from 'react';
import styles from './TrackingPage.module.css';
import {TrackingPageProps} from './types'
import {io, Socket} from "socket.io-client";
// import Popup from "@/shared/ui/Popup/Popup";
import {
  WarningOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

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
      {/* {isPopupOpened &&
        <Popup title={'Уведомление'} isOpen={true} onClose={() => setIsPopupOpened(false)}>
          <div className={styles.content}>
            {notification.level === 'info' && <InfoCircleOutlined style={{ color: 'blue', fontSize: '50px' }} />}
            {notification.level === 'warning' && <WarningOutlined style={{ color: 'orange', fontSize: '50px' }} />}
            {notification.level === 'critical' && <WarningOutlined style={{ color: 'red', fontSize: '50px' }} />}
            <span className={styles.text}>{notification.message}</span>
          </div>
        </Popup>
      } */}
    </>
  );
};

export default TrackingPage;