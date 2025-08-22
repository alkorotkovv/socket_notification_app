import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, ShoppingOutlined, ContactsOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <Menu 
      theme="dark" 
      mode="horizontal" 
      selectedKeys={[location.pathname]}
      items={[
        {
          key: '/',
          icon: <HomeOutlined />,
          label: <Link to="/">Главная</Link>,
        },
        {
          key: '/products',
          icon: <ShoppingOutlined />,
          label: <Link to="/products">Товары</Link>,
        },
        {
          key: '/contact',
          icon: <ContactsOutlined />,
          label: <Link to="/contact">Контакты</Link>,
        },
      ]}
    />
  );
};

export default Navigation;