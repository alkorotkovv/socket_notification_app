import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

const FooterWidget: React.FC = () => {

  return (
    <Footer style={{ textAlign: 'center' }}>
      React + Express App ©2023
    </Footer>
  );
};

export default FooterWidget;