import { useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import './Cart.css';
import { Spinner } from 'react-bootstrap';
import '../UI/CustomButton.css';
import CartCard from './CartCard';
import CartSum from './CartSum';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartData } from '../../store/cart-actions';

let isInitial = true;

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const isLoading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(fetchCartData());
    isInitial = false;
  }, [dispatch]);

  if (isLoading) {
    isInitial = false;
    return (
      <Container className="cart-wrapper">
        <div className="spinner-container">
          <Spinner animation="border" />
        </div>
      </Container>
    );
  }

  if (cart.items.length < 1 && !isInitial) {
    return (
      <Container className="cart-wrapper">
        <h1>הסל ריק</h1>
      </Container>
    );
  }
  return (
    <Container className="cart-wrapper">
      {cart.isDataLoad && (
        <div className="spinner-container">
          <Spinner animation="border" />
        </div>
      )}
      <Row>
        <Col md={8}>
          <h1>עכשיו בסל שלך</h1>
          {cart.items.map((placeObj) => (
            <CartCard key={placeObj.item_id} placeObj={placeObj} />
          ))}
        </Col>
        <Col md={4}>
          <CartSum totalPrice={cart.totalPrice} />
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
