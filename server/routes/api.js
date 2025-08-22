const express = require('express');
const router = express.Router();

// Импорт контроллеров
const { getPages } = require('../controllers/appController');
const { getHomeData } = require('../controllers/homeController');
const { getProducts, getProductById } = require('../controllers/productController');
const { submitContact } = require('../controllers/contactController');

// Маршруты API
router.get('/app', getPages);
router.get('/home', getHomeData);
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/contact', submitContact);

module.exports = router;