import { useEffect, useState } from 'react';
import { Container, Col, Row, Spinner } from 'react-bootstrap';
import useSessionApi from '../../../utils/useSessionApi';
import '../../UI/CustomButton.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useNavigate } from 'react-router-dom';
import './Checkout';

function Checkout() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [bookingId, setBookingId] = useState(null);

  const {
    sessionPlace,
    //handlePlaceClick,
    activePlaceIds,
    isLoading,
    totalPrice,
  } = useSessionApi();
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
    if (!isLoading && activePlaceIds.length < 1 && bookingId !== null) {
      navigate('/cart');
    }
  }, [activePlaceIds, navigate, isLoading, bookingId]);

  return (
    <Container className="cart-wrapper">
      {isLoading ? (
        <div className="spinner-container">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row>
          <Col md={8}>
            <Col md={6}>
              {clientSecret && (
                <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm
                    bookingId={bookingId}
                    setBookingId={setBookingId}
                  />
                </Elements>
              )}
            </Col>
          </Col>
          <Col md={4}>
            <h1>סיכום הזמנה</h1>
            {sessionPlace.map((placeObj) => (
              <div key={placeObj.item_id}>
                {'שם: '}
                {placeObj.name}
              </div>
            ))}
            <div>total price: {totalPrice}</div>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Checkout;
