const { server } = require('./app');

const PORT = process.env.PORT || 5000;

// Запуск сервера
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Server error:', err);
});