const {pages} = require('../data/mockData')

const getPages = (req, res) => {
  // Имитация задержки загрузки
  setTimeout(() => {
    console.log(pages)
    res.send({pages});
  }, 200);
};

module.exports = {
  getPages
};