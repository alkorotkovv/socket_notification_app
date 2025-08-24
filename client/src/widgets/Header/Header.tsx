import React from 'react';
import { Layout } from 'antd';
import { Menu, Space } from 'antd';
import { HomeOutlined, ShoppingOutlined, ContactsOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import NotificationButton from '../../features/NotificationSender/ui/NotificationButton/NotificationButton';
import styles from './Header.module.css';
const { Header } = Layout;

const HeaderWidget: React.FC = () => {

  const location = useLocation();

  return (
    <Header>
      <div className={styles.navContainer}>
        <Menu 
          theme="dark" 
          mode="horizontal" 
          selectedKeys={[location.pathname]}
          className={styles.menu}
          items={[
            {
              key: '/',
              icon: <HomeOutlined />,
              label: <Link to="/" className={styles.link}>Главная</Link>,
            },
            {
              key: '/products',
              icon: <ShoppingOutlined />,
              label: <Link to="/products" className={styles.link}>Товары</Link>,
            },
            {
              key: '/contact',
              icon: <ContactsOutlined />,
              label: <Link to="/contact" className={styles.link}>Контакты</Link>,
            },
          ]}
        />
        <Space className={styles.notificationButton}>
          <NotificationButton />
        </Space>
      </div>
    </Header>
  );
};

export default HeaderWidget;