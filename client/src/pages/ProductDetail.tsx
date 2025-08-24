import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Spin, Alert, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(`/api/products/${id}`);
        setProduct(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />;
  if (error) return <Alert message="Ошибка" description={error} type="error" />;

  return (
    <div>
      <Button type="link" icon={<ArrowLeftOutlined />} style={{ marginBottom: 16 }}>
        <Link to="/products">Назад к товарам</Link>
      </Button>
      
      {product && (
        <Card
          cover={<div style={{ height: 300, background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: 48, color: '#1890ff' }}>{product.name}</h1>
              <p style={{ fontSize: 24, color: '#52c41a' }}>{product.price} руб.</p>
            </div>
          </div>}
        >
          <Card.Meta
            description={
              <div>
                <p>{product.description}</p>
                <Button type="primary" size="large" style={{ marginTop: 16 }}>
                  Добавить в корзину
                </Button>
              </div>
            }
          />
        </Card>
      )}
    </div>
  );
};

export default ProductDetail;