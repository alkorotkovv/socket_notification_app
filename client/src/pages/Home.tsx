import React, { useEffect, useState } from 'react';
import { Card, Statistic, Row, Col, Spin, Alert } from 'antd';
import { UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

interface HomeData {
  message: string;
  serverTime: string;
  visitCount: number;
}

const Home: React.FC = () => {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<HomeData>('/api/home');
        setData(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />;
  if (error) return <Alert message="Ошибка" description={error} type="error" />;

  return (
    <div>
      <h1>Главная страница</h1>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Посетителей сегодня"
              value={data?.visitCount || 0}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Время сервера"
              value={data?.serverTime || ''}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <Card style={{ marginTop: 20 }}>
        <p>{data?.message}</p>
      </Card>
    </div>
  );
};

export default Home;