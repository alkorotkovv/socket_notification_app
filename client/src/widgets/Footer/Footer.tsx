import { FC } from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

const FooterWidget: FC = () => {

  return (
    <Footer style={{ textAlign: 'center' }}>
      React + Express App ©2025
    </Footer>
  );
};

export default FooterWidget;