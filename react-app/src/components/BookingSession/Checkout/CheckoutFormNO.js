import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createBooking } from '../../../utils/useBookingApi';
import '../../UI/CustomButton.css';
import './CartForm.css';

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

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentRequest] = useState(() =>
    stripe
      ? stripe.paymentRequest({
          country: 'US', // Your country here
          currency: 'usd', // Your currency here
          total: {
            label: 'Demo total',
            amount: 1000,
          },
        })
      : null
  );

  useEffect(() => {
    if (stripe) {
      setPaymentRequest(
        stripe.paymentRequest({
          country: 'US', // Your country here
          currency: 'usd', // Your currency here
          total: {
            label: 'Demo total',
            amount: 1000,
          },
        })
      );
    }
  }, [stripe]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    if (!stripe || !elements || !paymentRequest) {
      // Stripe.js has not yet loaded.
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(PaymentElement),
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        console.log(result.paymentIntent);
        // Send booking data to the server
        createBooking(data);
      }
    }
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };

  const mustStar = <span style={{ color: 'red' }}>*</span>;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <label htmlFor="firstName">
          {mustStar}
          {'שם פרטי'}
        </label>
        <div className="input-wrapper">
          <Controller
            control={control}
            name="firstName"
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                placeholder="שם פרטי"
                className={errors.firstName ? 'invalid' : 'valid'}
              />
            )}
          ></Controller>
          {errors.firstName && (
            <p className="error">{errors.firstName.message}</p>
          )}
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="lastName">
          {mustStar}
          {'שם משפחה'}
        </label>
        <div className="input-wrapper">
          <Controller
            control={control}
            name="lastName"
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                placeholder="שם משפחה"
                className={errors.lastName ? 'invalid' : 'valid'}
              />
            )}
          />
          {errors.lastName && (
            <p className="error">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="email">
          {mustStar}
          {'דואר אלקטרוני'}
        </label>
        <div className="input-wrapper">
          <Controller
            control={control}
            name="email"
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                placeholder='דוא"ל'
                className={errors.email ? 'invalid' : 'valid'}
              />
            )}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="phoneNumber">
          {mustStar}
          {'סלולרי'}
        </label>
        <div className="input-wrapper">
          <Controller
            control={control}
            name="phoneNumber"
            defaultValue=""
            render={({ field }) => (
              <input
                style={{ direction: 'ltr' }}
                {...field}
                placeholder="0512345678"
                className={errors.phoneNumber ? 'invalid' : 'valid'}
              />
            )}
          />
          {errors.phoneNumber && (
            <p className="error">{errors.phoneNumber.message}</p>
          )}
        </div>
      </div>
      <PaymentElement id="payment-element" options={{ paymentRequest }} />

      <button type="submit" disabled={!stripe} className="custom-button">
        שלם
      </button>
      <div> 4242424242424242</div>
    </form>
  );
};

export default CheckoutForm;
