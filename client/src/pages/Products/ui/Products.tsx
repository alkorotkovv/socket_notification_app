import { FC, useEffect, useState } from 'react';
import { Card, Spin, Alert, Row, Col } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Product } from '../model/types';
import axios from 'axios';

export const Products: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('/api/products');
        setProducts(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />;
  if (error) return <Alert message="Ошибка" description={error} type="error" />;

  return (
    <div>
      <h1><ShoppingOutlined /> Наши товары</h1>
      <Row gutter={16}>
        {products.map(product => (
          <Col span={8} key={product.id} style={{ marginBottom: 16 }}>
            <Link to={`/products/${product.id}`}>
              <Card
                hoverable
                cover={<div style={{ height: 200, background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShoppingOutlined style={{ fontSize: 64, color: '#1890ff' }} />
                </div>}
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <div>
                      <p>{product.description}</p>
                      <p style={{ fontWeight: 'bold', color: '#52c41a' }}>{product.price} руб.</p>
                    </div>
                  }
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};