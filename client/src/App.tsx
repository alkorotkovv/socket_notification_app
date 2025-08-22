import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import Navigation from './components/Navigation';
import AppRoutes from './routes/AppRoutes';
import 'antd/dist/reset.css';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
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
  );
};

export default App;