const getHomeData = (req, res) => {
  res.json({ 
    message: 'Добро пожаловать на главную страницу!',
    serverTime: new Date().toLocaleString(),
    visitCount: Math.floor(Math.random() * 1000) + 1
  });
};

module.exports = {
  getHomeData
};