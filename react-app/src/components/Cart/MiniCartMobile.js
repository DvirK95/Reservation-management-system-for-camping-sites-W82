import { Container, Col } from 'react-bootstrap';
import './Cart.css';
import { Spinner } from 'react-bootstrap';
import './MiniCart.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//import { cartActions } from '../../store/cart-slice';
import { fetchCartData } from '../../store/cart-actions';
import { useEffect } from 'react';

function MiniCartMobile() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  if (cart.items.length > 0) {
    return (
      <Container fluid className="mini-cart-mobile-wrapper">
        <Col>
          <span className="total-price">סה"כ:</span>
        </Col>
        <Col dir="ltr">
          {cart.totalPrice === 'loading price' ? (
            <div className="spinner">
              <Spinner animation="border" />
            </div>
          ) : (
            <span className="total-price">₪{cart.totalPrice}</span>
          )}
        </Col>
        <Link to="/cart" className="secondary-button button-hover-white">
          לסל הקניות
        </Link>
      </Container>
    );
  }
}

export default MiniCartMobile;
