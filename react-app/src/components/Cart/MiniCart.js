import { Row, Col, Image } from 'react-bootstrap';
import './Cart.css';
import { Spinner } from 'react-bootstrap';
import './MiniCart.css';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import { removeItemFromCart, fetchCartData } from '../../store/cart-actions';
import { useEffect } from 'react';

function MiniCart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  const handleMouseEnter = () => {
    dispatch(cartActions.showCart(true));
  };

  const handleMouseLeave = () => {
    dispatch(cartActions.showCart(false));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const emptyCart = (
    <>
      {cart.isDataLoad && (
        <div>
          <Spinner animation="border" />
        </div>
      )}
      {!cart.isDataLoad && <h4>הסל ריק</h4>}
    </>
  );

  return (
    <div
      className={`cart-box ${cart.showCart ? 'open' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-container">
        <div>
          <button className="close-button" onClick={handleMouseLeave}>
            X
          </button>
          <h4 id="box-title">סל הקניות שלי </h4>
        </div>

        {cart.items.length < 1 ? (
          emptyCart
        ) : (
          <>
            {cart.items.map((placeObj) => (
              <div key={placeObj.item_id} className="mini-card">
                <Row>
                  <span className="date">
                    {placeObj.startDate} - {placeObj.endDate}
                  </span>
                </Row>
                <Row>
                  <Col xxl={5}>
                    {
                      <Image
                        src={placeObj.image['1'].url_small}
                        rounded
                        alt="small"
                      />
                    }
                  </Col>
                  <Col xxl={6}>
                    <Row>₪{placeObj.rate.total}</Row>
                    <Row>{placeObj.name}</Row>
                    <Row>
                      <span className="peoples-text">
                        בוגר: {placeObj.adults}
                      </span>
                      <span className="peoples-text">
                        ילד: {placeObj.children}
                      </span>
                      <span className="peoples-text">
                        פעוט: {placeObj.toddler}
                      </span>
                    </Row>
                  </Col>
                  <Col xxl={1} dir="ltr">
                    <button
                      style={{ display: 'contents' }}
                      onClick={() => handleRemoveItem(placeObj.item_id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} className="icon" />
                    </button>
                  </Col>
                </Row>
              </div>
            ))}
          </>
        )}
        <Row>
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
        </Row>
        <Row>
          <Link to="/checkout" className="primary-button button-hover-white">
            המשך לתשלום
          </Link>
          <Link to="/cart" className="secondary-button button-hover-white">
            לסל הקניות
          </Link>
        </Row>
      </div>
    </div>
  );
}

export default MiniCart;
