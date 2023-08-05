import { PaymentElement } from '@stripe/react-stripe-js';
import FormFields from './FormFields';
import useCheckoutForm from './Hooks/useCheckoutForm';

function CheckoutForm() {
  const {
    message,
    stripe,
    register,
    errors,
    isProcessing,
    elements,
    handleSubmit,
    onSubmit,
  } = useCheckoutForm();
  const innerCardStyle = { padding: '1rem' };
  return (
    <form id="checkout-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="card-item">
        <div style={innerCardStyle}>
          <h2>פרטיים אישיים</h2>
          <FormFields register={register} errors={errors} />
        </div>
      </div>
      <div className="card-item">
        <div style={innerCardStyle}>
          <h2>תשלום</h2>
          <PaymentElement
            id="payment-element"
            options={{
              layout: 'tabs',
              paymentMethodOrder: ['apple_pay', 'google_pay', 'card'],
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button
          style={{
            width: '100%',
          }}
          className="primary-button button-hover-white"
          disabled={isProcessing || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isProcessing ? 'מבצע תשלום... ' : 'שלם עכשיו'}
          </span>
        </button>
      </div>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

export default CheckoutForm;
