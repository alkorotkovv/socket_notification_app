import { FC, useState, useEffect } from 'react';
import { Modal, Space, Typography } from 'antd';
import { io, Socket } from 'socket.io-client';
import { WarningOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { TrackingPageProps, NotificationData } from '../model/types';
import { CONST_WEBSOCKET_PAGE_BASE_URL } from '../model/constants';
import { useTitle } from '@shared/hooks/useTitle';
const { Text } = Typography;

export const TrackingPage: FC<TrackingPageProps> = ({ component, uid, page_id, page_name }) => {

  useTitle(page_name)
  
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationData>({ message: '', level: ''});

  useEffect(() => {

    const pageSocket: Socket = io(CONST_WEBSOCKET_PAGE_BASE_URL + page_id);

    // pageSocket.on('connect', () => {
    //   pageSocket.emit('session_start', { uid, page_id });
    // });
    
    pageSocket.on('notification', (data: { message: string, level: string }) => {
      console.log('Получили уведомление')
      console.log(data)
      setNotification({message: data.message, level: data.level});
      setIsModalVisible(true);
    });

    return () => {
      // pageSocket.emit('session_end', { uid, page_id });
      pageSocket.disconnect();
    };
  }, []);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const renderIcon = () => {
    switch (notification.level) {
      case 'info':
        return <InfoCircleOutlined style={{ color: 'blue', fontSize: '48px' }} />;
      case 'warning':
        return <WarningOutlined style={{ color: 'orange', fontSize: '48px' }} />;
      case 'critical':
        return <WarningOutlined style={{ color: 'red', fontSize: '48px' }} />;
      default:
        return <InfoCircleOutlined style={{ color: 'blue', fontSize: '48px' }} />;
    }
  };

  return (
    <>
      {component}
      <Modal
        title="Уведомление"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        centered
        width={400}
      >
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <Space direction="vertical" size="middle" style={{ display: 'flex', alignItems: 'center' }}>
            {renderIcon()}
            <Text style={{ fontSize: '16px' }}>{notification.message}</Text>
          </Space>
        </div>
      </Modal>
    </>
  );
};
