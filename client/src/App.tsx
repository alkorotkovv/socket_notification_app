import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import Navigation from './components/Navigation/Navigation';
import AppRoutes from './routes/AppRoutes';
import { WebSocketProvider } from './providers/Websocket/WebSocketProvider';
import 'antd/dist/reset.css';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <WebSocketProvider>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Header>
            <Navigation />
          </Header>
          <Content style={{ padding: '0 50px', marginTop: 20 }}>
            <AppRoutes />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            React + Express App ©2023
          </Footer>
        </Layout>
      </Router>
    </WebSocketProvider>
  );
}

export default App;