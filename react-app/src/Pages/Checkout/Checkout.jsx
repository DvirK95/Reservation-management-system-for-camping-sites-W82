import { Container, Col, Row, Spinner } from 'react-bootstrap';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../components/Checkout/CheckoutForm';
import './Checkout.css';
import ProcessStep from '../../components/ProcessStep/ProcessStep';
import CheckoutFormPlaceHolder from '../../components/Checkout/CheckoutFormPlaceHolder';
import useCheckout from './useCheckout';

function Checkout() {
  const { isLoading, clientSecret, stripePromise, options, items, totalPrice } =
    useCheckout();

  return (
    <Container className="cart-wrapper">
      <ProcessStep currentStep={'2'} />
      {isLoading ? (
        <div className="spinner-container">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row>
          <Col md={8}>
            <Col md={6} className="center">
              {clientSecret ? (
                <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm />
                </Elements>
              ) : (
                <CheckoutFormPlaceHolder />
              )}
            </Col>
          </Col>
          <Col md={4}>
            <div className="card-item" style={{ padding: '1rem' }}>
              <h2>סיכום הזמנה</h2>
              <p>
                <b>פירוט:</b>
              </p>
              {items.map((placeObj) => (
                <div key={placeObj.item_id}>
                  {placeObj.name}
                  <hr />
                </div>
              ))}{' '}
              {!totalPrice ? (
                <div className="spinner">
                  <Spinner animation="border" />
                </div>
              ) : (
                <p>
                  <b> סה"כ: </b>₪{totalPrice}
                </p>
              )}
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Checkout;
