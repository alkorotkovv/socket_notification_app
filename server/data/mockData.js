// Моковые данные
const products = [
  { id: 1, name: 'Ноутбук', price: 50000, description: 'Мощный ноутбук для работы и игр' },
  { id: 2, name: 'Смартфон', price: 25000, description: 'Современный смартфон с отличной камерой' },
  { id: 3, name: 'Планшет', price: 30000, description: 'Универсальный планшет для всей семьи' }
];

const posts = [
  { id: 1, title: 'Первая статья', content: 'Содержание первой статьи', date: '2023-01-15' },
  { id: 2, title: 'Вторая статья', content: 'Содержание второй статьи', date: '2023-02-20' }
];

const pages = [
  { id: 0, name: 'Home' },
  { id: 1, name: 'Products' },
  { id: 2, name: 'ProductDetail' },
  { id: 3, name: 'Contact' }
]

module.exports = {
  products,
  posts,
  pages
};