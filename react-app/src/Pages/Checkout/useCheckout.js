import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function useCheckout() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  const items = useSelector((state) => state.cart.items);
  const isLoading = useSelector((state) => state.isDataLoad);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const navigate = useNavigate();

  useEffect(() => {
    if (totalPrice > 0) {
      fetch(`${process.env.REACT_APP_API_URL}/payment/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ totalPrice }),
      })
        .then(async (result) => {
          const { clientSecret } = await result.json();
          setClientSecret(clientSecret);
        })
        .catch((error) => {
          console.error('Error:', error);
          navigate('/oops');
        });
    }
  }, [navigate, totalPrice]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/payment/config`).then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey, { locale: 'he' }));
    });
  }, []);

  const options = {
    clientSecret,
    // אפשר לראות באתר הרשמי את ההגדרות
    appearance: {
      theme: 'stripe',
    },
  };

  useEffect(() => {
    if (!isLoading && items.length < 1) {
      navigate('/cart');
    }
  }, [items, navigate, isLoading]);

  return { isLoading, clientSecret, stripePromise, options, items, totalPrice };
}

export default useCheckout;
