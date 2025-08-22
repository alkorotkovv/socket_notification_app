import React, { useState } from 'react';
import { Form, Input, Button, Alert, Card, message } from 'antd';
import { UserOutlined, MailOutlined, MessageOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: ContactForm) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/contact', values);
      message.success(response.data.message);
      form.resetFields();
    } catch (error: any) {
      message.error('Произошла ошибка при отправке сообщения');
      console.error('Ошибка при отправке:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Свяжитесь с нами">
      <Form
        form={form}
        name="contact"
        onFinish={onFinish}
        layout="vertical"
        size="large"
      >
        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: 'Пожалуйста, введите ваше имя!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Ваше имя" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Пожалуйста, введите ваш email!' },
            { type: 'email', message: 'Неверный формат email' }
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Ваш email" />
        </Form.Item>

        <Form.Item
          label="Сообщение"
          name="message"
          rules={[{ required: true, message: 'Пожалуйста, введите ваше сообщение!' }]}
        >
          <TextArea 
            rows={4} 
            placeholder="Ваше сообщение..." 
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Отправить сообщение
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Contact;