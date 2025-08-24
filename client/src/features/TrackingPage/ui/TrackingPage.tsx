import { FC, useEffect, useState } from 'react';
import { Modal, Space, Typography } from 'antd';
import { WarningOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { io, Socket } from 'socket.io-client';
import { TrackingPageProps } from '../types';

const { Text } = Typography;

const TrackingPage: FC<TrackingPageProps> = ({ component, uid, page_id }) => {
  const CONST_WEBSOCKET_PAGE_URL = `http://localhost:3500/page_${page_id}`;
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [notification, setNotification] = useState({ message: '', level: '' });

  useEffect(() => {
    console.log(page_id);

    const pageSocket: Socket = io(CONST_WEBSOCKET_PAGE_URL);

    // pageSocket.on('connect', () => {
    //   pageSocket.emit('session_start', { uid, page_id });
    // });

    pageSocket.on('notification', (data: { message: string, level: string }) => {
      console.log('Получили уведомление');
      setIsModalVisible(true);
      setNotification({ message: data.message, level: data.level });
    });

    return () => {
      // pageSocket.emit('session_end', { uid, page_id });
      pageSocket.disconnect();
    };
  }, [page_id]);

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

export default TrackingPage;