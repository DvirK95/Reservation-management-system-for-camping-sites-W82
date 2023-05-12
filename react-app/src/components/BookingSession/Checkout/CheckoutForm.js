import { PaymentElement } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { createBooking } from '../../../utils/useBookingApi';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import FormFields from './FormFields';
import Card from 'react-bootstrap/Card';

const requiredFieldMessage = 'שדה חובה';
const schema = yup.object().shape({
  firstName: yup.string().required(requiredFieldMessage),
  lastName: yup.string().required(requiredFieldMessage),
  email: yup
    .string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'האמייל לא תקין')
    .email('האמייל לא תקין')
    .required(requiredFieldMessage),
  phoneNumber: yup
    .string()
    .matches(/^0\d{9}$/, 'חייב להתחיל עם 0 ולהכיל 10 ספרות')
    .required(requiredFieldMessage),
});

function CheckoutForm({ bookingId, setBookingId }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          // bookingId
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const booking = createBooking(data);
    setBookingId(booking.id);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/invoice?booking_id=${bookingId}`,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occured.');
    }
    setIsProcessing(false);
  };

  return (
    <form id="checkout-form" onSubmit={handleSubmit(onSubmit)}>
      <Card bg="light">
        <Card.Body>
          <h2>פרטיים אישיים</h2>
          <FormFields register={register} errors={errors} />
        </Card.Body>
      </Card>
      <br />
      <Card bg="light">
        <Card.Body>
          <h2>תשלום</h2>
          <PaymentElement
            id="payment-element"
            options={{
              layout: 'tabs',
              paymentMethodOrder: ['apple_pay', 'google_pay', 'card'],
            }}
          />
        </Card.Body>
      </Card>
      <button
        className="custom-button"
        disabled={isProcessing || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isProcessing ? 'מבצע תשלום... ' : 'שלם עכשיו'}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

export default CheckoutForm;
