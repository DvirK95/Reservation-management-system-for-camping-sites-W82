import { useState, useEffect, useCallback } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { createBooking, updateBooking } from '../../../utils/useBookingApi';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const requiredFieldMessage = 'שדה חובה';
const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[A-Za-z\u0590-\u05FF]+$/i, 'השם לא תקין')
    .required(requiredFieldMessage),
  lastName: yup
    .string()
    .matches(/^[A-Za-z\u0590-\u05FF]+$/i, 'שם המשפחה לא תקין')
    .required(requiredFieldMessage),
  email: yup
    .string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'אימייל לא תקין')
    .email('האמייל לא תקין')
    .required(requiredFieldMessage),
  phoneNumber: yup
    .string()
    .matches(/^0\d{9}$/, 'חייב להתחיל עם 0 ולהכיל 10 ספרות')
    .required(requiredFieldMessage),
});

function useCheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();

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
      return;
    }

    setIsProcessing(true);
    execute(data);
  };

  const execute = useCallback(
    async (data) => {
      const response = await stripe.confirmPayment({
        elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: `${data.firstName} ${data.lastName}`,
              email: `${data.email}`,
              phone: `${data.phoneNumber}`,
            },
            /*metadata: {
              booking_id: bookingId,
            },*/
          },
        },
        redirect: 'if_required',
      });
      if (response.error) {
        if (
          response.error.type === 'card_error' ||
          response.error.type === 'validation_error'
        ) {
          setMessage(response.error.message);
        } else {
          setMessage('שגיאה לא צפויה');
        }
        setIsProcessing(false);
      } else {
        createBooking(data).then(async (bookingId) => {
          await updateBooking(bookingId, 'PAID');
          await fetch(`${process.env.REACT_APP_API_URL}/payment/${bookingId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              paymentIntentId: response.paymentIntent.id,
            }),
          });
          setMessage(`Payment Succeeded: ${response.paymentIntent.id}`);
          navigate(`/checkout/confirm/${bookingId}`);
        });
      }
    },
    [stripe, elements, setMessage, navigate]
  );

  return {
    message,
    stripe,
    register,
    errors,
    isProcessing,
    elements,
    handleSubmit,
    onSubmit,
  };
}

export default useCheckoutForm;
