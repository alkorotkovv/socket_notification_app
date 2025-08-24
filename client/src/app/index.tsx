import { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/reset.css';
import { Layout } from 'antd';
import AppRoutes from '@app/providers/Router/Router';
import FooterWidget from '@widgets/Footer/Footer';
import HeaderWidget from '@widgets/Header/Header';
import { WebSocketProvider } from '@app/providers/Websocket/WebSocketProvider';
const { Content } = Layout;

const App: FC = () => {
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