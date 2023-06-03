import { Container, Col, Row } from 'react-bootstrap';
import './Cart.css';
import { Spinner } from 'react-bootstrap';
import './MiniCart.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import { fetchCartData } from '../../store/cart-actions';
import { useEffect } from 'react';

function MiniCartMobile() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  const handleMouseLeave = () => {
    dispatch(cartActions.showCart(false));
  };


  if (cart.items.length > 0) {
    return (
      <Container fluid 
        className={`mini-cart-mobile-wrapper ${cart.showCart ? 'open' : ''}`}
        onMouseLeave={handleMouseLeave}
      >
        <button className="close-button" onClick={handleMouseLeave}>
            X
        </button>
        <div className="scroll-list-cart mobile">
          {cart.items.map((placeObj) => (
                <div key={placeObj.item_id} >
                  <Row>
                      <Col xs={9}>{placeObj.name}</Col>
                      <Col xs={2}>₪{placeObj.rate.total}</Col>
                  </Row>
                  <hr />
                </div>
          ))}
        </div>

        <Row>
          <Col xs={6}>
            <span className="total-price">סה"כ:</span>
          </Col>

          <Col xs={6} dir="ltr">
            {cart.totalPrice === 'loading price' ? (
              <div className="spinner">
                <Spinner animation="border" />
              </div>
            ) : (
              <span className="total-price">₪{cart.totalPrice}</span>
            )}
          </Col>
        </Row>

        <Link to="/cart" className="secondary-button button-hover-white">
          לסל הקניות
        </Link>
      </Container>
    );
  }
}

export default MiniCartMobile;
