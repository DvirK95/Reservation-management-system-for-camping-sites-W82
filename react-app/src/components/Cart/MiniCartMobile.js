import { Container, Col, Row } from 'react-bootstrap';
import './Cart.css';
import { Spinner } from 'react-bootstrap';
import './MiniCart.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import { fetchCartData } from '../../store/cart-actions';
import { useEffect } from 'react';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      <Container
        fluid
        className={`mini-cart-mobile-wrapper ${!cart.showCart ? 'close' : ''}`}
        //onMouseLeave={handleMouseLeave}
      >
        <button className="close-button" onClick={handleMouseLeave}>
          X
        </button>
        <div className="scroll-list-cart mobile">
          {cart.items.map((placeObj) => (
            <div>
              <Row
                key={placeObj.item_id}
                style={{ width: '90%', position: 'relative', left: '-1rem' }}
              >
                <Col xs={8}>{placeObj.name}</Col>
                <Col xs={3}>₪{placeObj.rate.total}</Col>
                <Col xs={1}>
                  <FontAwesomeIcon icon={faTrashAlt} className="icon" />
                </Col>
              </Row>
              <hr />
            </div>
          ))}
        </div>

        <Row className="justify-content-xs-center">
          <Col xs={7}>
            <span className="total-price">סה"כ:</span>
          </Col>

          <Col xs={5} dir="ltr">
            {cart.totalPrice === 'loading price' ? (
              <div className="spinner">
                <Spinner animation="border" />
              </div>
            ) : (
              <span className="total-price">₪{cart.totalPrice}</span>
            )}
          </Col>
        </Row>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Link
            to="/cart"
            className="secondary-button button-hover-white"
            style={{ width: '95%' }}
          >
            לסל הקניות
          </Link>
        </div>
      </Container>
    );
  }
}

export default MiniCartMobile;
