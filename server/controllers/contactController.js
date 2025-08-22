const submitContact = (req, res) => {
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
};

module.exports = {
  submitContact
};