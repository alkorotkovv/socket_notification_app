const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Данные для примера
const products = [
  { id: 1, name: 'Ноутбук', price: 50000, description: 'Мощный ноутбук для работы и игр' },
  { id: 2, name: 'Смартфон', price: 25000, description: 'Современный смартфон с отличной камерой' },
  { id: 3, name: 'Планшет', price: 30000, description: 'Универсальный планшет для всей семьи' }
];

const posts = [
  { id: 1, title: 'Первая статья', content: 'Содержание первой статьи', date: '2023-01-15' },
  { id: 2, title: 'Вторая статья', content: 'Содержание второй статьи', date: '2023-02-20' }
];

// Маршруты API
app.get('/api/home', (req, res) => {
  res.json({ 
    message: 'Добро пожаловать на главную страницу!',
    serverTime: new Date().toLocaleString(),
    visitCount: Math.floor(Math.random() * 1000) + 1
  });
});

app.get('/api/products', (req, res) => {
  // Имитация задержки загрузки
  setTimeout(() => {
    res.json(products);
  }, 800);
});

app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Товар не найден' });
  }
});

app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Получено сообщение:', { name, email, message });
  
  // Имитация обработки
  setTimeout(() => {
    res.json({ 
      status: 'success', 
      message: 'Сообщение отправлено успешно!',
      receivedData: { name, email, message }
    });
  }, 1000);
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Server error:', err);
});