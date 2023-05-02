import { Route, Routes } from 'react-router-dom';
import Sites from './components/Sites/Sites';
import FloatingButton from './components/Accessibility/FloatingButton';
import NotFound from './pages/NotFound';
import Cart from './components/BookingSession/Cart';
import Home from './components/UI/Home';
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
function App() {
  return (
    <>
      <Header />
      <FloatingButton />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sites/:siteId/" element={<Sites />} />
          <Route path="Cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
