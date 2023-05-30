import { Route, Routes, useLocation } from 'react-router-dom';

import Sites from './components/Sites/Sites';
import FloatingButton from './components/Accessibility/FloatingButton';
import NotFound from './pages/NotFound';
import Cart from './components/Cart/Cart';
import Home from './components/UI/Home';
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
import Checkout from './components/Checkout/Checkout';
import Confirm from './components/Checkout/Confirm';
import MiniCart from './components/Cart/MiniCart';
import ProcessStep from './components/Sites/ProcessStep';
import React, { useState, useEffect } from 'react';

const steps = [
  { path: '/:campingName/:siteId', num: '1', label: 'ביצוע הזמנה' },
  { path: '/Cart', num: '2', label: 'סל קניות' },
  { path: '/checkout', num: '3', label: 'מעבר לתשלום' },
  { path: '/checkout/confirm/:bookingId', num: '4', label: 'אישור וסיום' },
];

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const location = useLocation();

  // Find the current step index based on the current path
  useEffect(() => {
    const getCurrentStepIndex = () => {
      const currentPath = location.pathname;
      const index = steps.findIndex((step) => step.path === currentPath);
      return index >= 0 ? index : 0;
    };

    // Update the current step index when the route changes
    const index = getCurrentStepIndex();
    setCurrentStep(index);
  }, [location]);

  return (
    <>
      <div style={{ height: '4.2rem' }}></div>

      <Header />
      <FloatingButton />
      <MiniCart />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/:campingName/:siteId"
            element={
              <>
                <ProcessStep steps={steps} currentStep={currentStep} />
                <Sites />
              </>
            }
          />
          <Route
            path="Cart"
            element={
              <>
                <ProcessStep steps={steps} currentStep={currentStep} />
                <Cart />
              </>
            }
          />
          <Route
            path="checkout"
            element={
              <>
                <ProcessStep steps={steps} currentStep={currentStep} />
                <Checkout />
              </>
            }
          />
          <Route
            path="checkout/confirm/:bookingId"
            element={
              <>
                <ProcessStep steps={steps} currentStep={currentStep} />
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
