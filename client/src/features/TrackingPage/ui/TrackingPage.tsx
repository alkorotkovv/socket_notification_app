import { FC, useState, useEffect } from 'react';
import { Modal, Space, Typography } from 'antd';
import { WarningOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { TrackingPageProps } from '../model/types';
import { useNotification } from '../model/useNotification';
const { Text } = Typography;

export const TrackingPage: FC<TrackingPageProps> = ({ component, uid, page_id }) => {
  
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const {message, level} = useNotification(page_id, uid);

  useEffect(() => {
    if (message) {
      setIsModalVisible(true);   
    }
  }, [message]);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const renderIcon = () => {
    switch (level) {
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
            <Text style={{ fontSize: '16px' }}>{message}</Text>
          </Space>
        </div>
      </Modal>
    </>
  );
};
