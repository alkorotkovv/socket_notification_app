import { FC, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
  Form,
  Input,
  Select,
  Checkbox,
  Space,
  Row,
  Col,
  message,
  Button,
  List,
  Card,
  Typography
} from 'antd';
import {
  WarningOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { useAppWebsocket } from "@shared/hooks/useAppWebsocket";
import { CONST_NOTIFICATION_TEMPLATES } from "../../model/constants";

import {
  levelType,
  pageType,
  notificationDataType,
  notificationTemplateType,
} from '../../model/types';

const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;

const initValues: notificationDataType = {
  level: 'info',
  message: '',
  pages: []
}

export const NotificationForm: FC = () => {
  const { socket } = useAppWebsocket();
  const [isSending, setIsSending] = useState<boolean>(false);
  const [levelValue, setLevelValue] = useState<levelType>(initValues.level)
  const [messageValue, setMessageValue] = useState<string>(initValues.message)
  const [selectedPages, setSelectedPages] = useState(initValues.pages)
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const isCountdown = countdown > 0
  const [pagesData, setPagesData] = useState<pageType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/pages');
        setPagesData(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sendNotification = async () => {

    setIsSending(true);

    const notificationData: notificationDataType = {
      pages: selectedPages || [],
      message: messageValue.trim(),
      level: levelValue || 'info'
    };

    try {
      socket?.emit('notification', notificationData);
      setTimeout(() => {
        message.success('Уведомление успешно отправлено')
        resetForm()
        setIsSending(false);
        // onSuccess?.();
      }, 500);
    } catch (error) {
      console.error('Ошибка отправки уведомления:', error);
      message.error('Ошибка отправки уведомления')
      setIsSending(false);
    }
  };

  const resetForm = () => {
    setLevelValue(initValues.level)
    setMessageValue(initValues.message)
    setSelectedPages(initValues.pages)
  }

  const handlePageSelect = (id: number) => {
    const selectedIndex = selectedPages.indexOf(id);
    if (selectedIndex === -1) {
      setSelectedPages([...selectedPages, id])
    } else {
      setSelectedPages([...selectedPages].filter(col => col !== id))
    }
  }

  const applyTemplate = (template: notificationTemplateType) => {
    setMessageValue(template.message)
    setLevelValue(template.level)
  };

  const startCountdown = () => {
    const initialCountdown = 5;
    setCountdown(initialCountdown);
    setIsSending(true);

    countdownRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          sendNotification();
          if (countdownRef.current) {
            clearInterval(countdownRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelSend = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    setIsSending(false);
    setCountdown(0);
  };

  const getButtonColor = (level: levelType) => {
    switch (level) {
      case 'critical': return '#ff4d4f';
      case 'warning': return '#faad14';
      default: return '#1890ff';
    }
  };

  if (loading) return <div>Загрузка списка страниц...</div>;
  if (error) return <div>Ошибка загрузки списка страниц</div>;

  return (
    <div style={{ width: '100%', padding: '5px 10px' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={14}>
          <Form.Item label="Уровень важности">
            <Select 
              placeholder="Выберите уровень важности" 
              value={levelValue} 
              onChange={(value) => setLevelValue(value as levelType)}
            >
              <Option value="info">
                <Space>
                  <InfoCircleOutlined style={{ color: 'blue' }} />
                  Информационный
                </Space>
              </Option>
              <Option value="warning">
                <Space>
                  <WarningOutlined style={{ color: 'orange' }} />
                  Предупреждение
                </Space>
              </Option>
              <Option value="critical">
                <Space>
                  <WarningOutlined style={{ color: 'red' }} />
                  Критический
                </Space>
              </Option>
            </Select>
          </Form.Item>

          <Form.Item label="Текст уведомления">
            <TextArea
              rows={6}
              placeholder="Введите текст уведомления..."
              showCount
              maxLength={500}
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Шаблоны">
            <Space size={8} wrap>
              {CONST_NOTIFICATION_TEMPLATES.map(template => (
                <Button
                  key={template.id}
                  onClick={() => applyTemplate(template)}
                  style={{
                    backgroundColor: getButtonColor(template.level),
                    color: 'white',
                    border: 'none'
                  }}
                >
                  {template.name}
                </Button>
              ))}
            </Space>
          </Form.Item>
        </Col>

        <Col xs={24} md={10}>
          <Form.Item label="Выберите страницы">
            <Space style={{ marginBottom: 16 }}>
              <Button 
                type="link" 
                onClick={() => setSelectedPages(pagesData?.map(p => p.id) || [])}
              >
                Выбрать все
              </Button>
              <Button 
                type="link" 
                onClick={() => setSelectedPages([])}
              >
                Убрать все
              </Button>
            </Space>
            
            <Card size="small" style={{ maxHeight: 300, overflow: 'auto' }}>
              <List
                size="small"
                dataSource={pagesData}
                renderItem={page => (
                  <List.Item key={page.id}>
                    <Checkbox
                      checked={selectedPages.includes(page.id)}
                      onChange={() => handlePageSelect(page.id)}
                    >
                      <Text style={{ marginLeft: 8 }}>{page.name}</Text>
                    </Checkbox>
                  </List.Item>
                )}
              />
            </Card>
          </Form.Item>
        </Col>
      </Row>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        gap: 16, 
        marginTop: 24 
      }}>
        {!isCountdown ? (
          <Button
            type="primary"
            loading={isSending}
            disabled={!selectedPages.length || !messageValue.trim()}
            onClick={startCountdown}
            style={{ backgroundColor: '#66cc99', borderColor: '#66cc99' }}
          >
            {isSending ? 'Отправка...' : 'Отправить'}
          </Button>
        ) : (
          <>
            <Text style={{ color: '#ff4d4f', fontWeight: 'bold' }}>
              Уведомления будут отправлены через {countdown} сек
            </Text>
            <Button
              danger
              onClick={cancelSend}
            >
              Отменить отправку
            </Button>
          </>
        )}
      </div>
    </div>
  );
};