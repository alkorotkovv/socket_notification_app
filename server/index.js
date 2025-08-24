const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const apiRoutes = require('./routes/api');
const { handleSocketConnection } = require('./controllers/socketController');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Логирование запросов
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Маршруты API
app.use('/api', apiRoutes);

// Глобальная обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Что-то пошло не так!' });
});

const io = socketIo(3500, {
  cors: {
    origin: "http://localhost:3000"
  }
})
  
// Настройка обработчиков сокетов
handleSocketConnection(io);
  
// Сохраняем io в app для доступа в других местах
app.set('io', io);

const PORT = process.env.PORT || 5000;

// Запуск сервера
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Server error:', err);
});