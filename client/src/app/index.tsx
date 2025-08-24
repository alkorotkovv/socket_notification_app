import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import AppRoutes from './providers/Router/Router';
import { WebSocketProvider } from './providers/Websocket/WebSocketProvider';
import 'antd/dist/reset.css';
import FooterWidget from '../widgets/Footer/Footer';
import HeaderWidget from '../widgets/Header/Header';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <WebSocketProvider>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <HeaderWidget />
          <Content style={{ padding: '0 50px', marginTop: 20 }}>
            <AppRoutes />
          </Content>
          <FooterWidget />
        </Layout>
      </Router>
    </WebSocketProvider>
  );
}

export default App;