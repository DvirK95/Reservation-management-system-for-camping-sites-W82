import { Route, Routes } from 'react-router-dom';

import CampingSite from './Pages/CampingSite/CampingSite';
import FloatingButton from './components/Accessibility/FloatingButton';
import NotFound from './Pages/NotFound/NotFound';
import Info from './Pages/About/About';
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';
import TermsUse from './Pages/TermsUse/TermsUse';
import Cart from './Pages/Cart/Cart';
import Home from './Pages/Home/Home';
import Header from './components/UI/Header/Header';
import Footer from './components/UI/Footer/Footer';
import Checkout from './Pages/Checkout/Checkout';
import Confirm from './Pages/Confirm/Confirm';
import MiniCart from './components/Cart/MiniCart/MiniCart';
import React from 'react';

function App() {
  return (
    <>
      <div id="bufferHeader"></div>
      <Header />
      <FloatingButton />
      <MiniCart />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Info" element={<Info />} />
          <Route path="PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="TermsUse" element={<TermsUse />} />
          <Route
            path="/:campingName/:siteId"
            element={
              <>
                <CampingSite />
              </>
            }
          />
          <Route
            path="Cart"
            element={
              <>
                <Cart />
              </>
            }
          />
          <Route
            path="checkout"
            element={
              <>
                <Checkout />
              </>
            }
          />
          <Route
            path="checkout/confirm/:bookingId"
            element={
              <>
                <Confirm />
              </>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
