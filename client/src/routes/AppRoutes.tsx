import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import Contact from '../pages/Contact';
import TrackingPage from '../features/TrackingPage/ui/TrackingPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TrackingPage key="home" component={<Home />} uid={100} page_id={0}/>}/>
      <Route path="/products" element={<TrackingPage key="products" component={<Products />} uid={100} page_id={1}/>}/>
      <Route path="/products/:id" element={<TrackingPage key="detail" component={<ProductDetail />} uid={100} page_id={2}/>}/>
      <Route path="/contact" element={<TrackingPage key="contact" component={<Contact />} uid={100} page_id={3}/>}/>
    </Routes>
  );
}

export default AppRoutes;