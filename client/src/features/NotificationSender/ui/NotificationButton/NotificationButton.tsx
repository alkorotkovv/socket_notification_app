import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import { NotificationForm } from '../NotificationForm/NotificationForm';

const NotificationButton: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSuccess = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button 
        type="primary" 
        icon={<NotificationOutlined />}
        onClick={showModal}
        style={{ marginLeft: 'auto' }}
      >
        Отправить уведомление
      </Button>
      
      <Modal
        title="Отправка уведомления"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={900}
        destroyOnHidden
      >
        <NotificationForm onSuccess={handleSuccess} />
      </Modal>
    </>
  );
};

export default NotificationButton;