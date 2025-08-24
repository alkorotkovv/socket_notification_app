import { FC } from 'react'
import { Routes, Route } from 'react-router-dom';
import { Home } from '@pages/Home';
import { Products } from '@pages/Products';
import { ProductDetail } from '@pages/ProductDetail';
import { Contact } from '@pages/Contact';
import { TrackingPage } from '@features/TrackingPage';

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TrackingPage key="home" component={<Home />} uid={100} page_id={0} page_name={'Главная'}/>}/>
      <Route path="/products" element={<TrackingPage key="products" component={<Products />} uid={100} page_id={1} page_name={'Товары'}/>}/>
      <Route path="/products/:id" element={<TrackingPage key="detail" component={<ProductDetail />} uid={100} page_id={2} page_name={'Детали товара'}/>}/>
      <Route path="/contact" element={<TrackingPage key="contact" component={<Contact />} uid={100} page_id={3} page_name={'Контакты'}/>}/>
    </Routes>
  );
}

export default AppRoutes;