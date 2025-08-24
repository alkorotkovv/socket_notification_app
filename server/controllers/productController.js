const { products } = require('../mockData');

const getProducts = (req, res) => {
  // Имитация задержки загрузки
  setTimeout(() => {
    res.json(products);
  }, 800);
};

const getProductById = (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Товар не найден' });
  }
};

module.exports = {
  getProducts,
  getProductById
};