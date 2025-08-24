const {pages} = require('../mockData')

const getPages = (req, res) => {
  // Имитация задержки загрузки
  setTimeout(() => {
    res.send(pages);
  }, 200);
};

module.exports = {
  getPages
};