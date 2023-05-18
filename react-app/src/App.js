import { Route, Routes } from 'react-router-dom';

import Sites from './components/Sites/Sites';
import FloatingButton from './components/Accessibility/FloatingButton';
import NotFound from './pages/NotFound';
import Cart from './components/BookingSession/Cart/Cart';
import Home from './components/UI/Home';
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
import Checkout from './components/BookingSession/Checkout/Checkout';
import Confirm from './components/BookingSession/Checkout/Confirm';
import MiniCart from './components/BookingSession/Cart/MiniCart';
import Test from './Test';
function App() {
  return (
    <>
      <Header />
      <FloatingButton />
      <MiniCart />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sites/:siteId/" element={<Sites />} />
          <Route path="Cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/confirm/:bookingId" element={<Confirm />} />
          <Route path="test" element={<Test />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
