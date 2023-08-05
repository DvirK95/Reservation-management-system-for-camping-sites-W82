import { Container, Col, Row } from 'react-bootstrap';
import '../../../Pages/Cart/Cart.css';
import { Spinner } from 'react-bootstrap';
import './MiniCart.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useMiniCartMobile from './Hooks/useMiniCartMobile';

function MiniCartMobile() {
  const cart = useSelector((state) => state.cart);

  const { handleMouseLeave, handleRemoveItem } = useMiniCartMobile();
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
            <Row
              key={placeObj.item_id}
              style={{ width: '90%', position: 'relative', left: '-1rem' }}
            >
              <Col xs={8}>{placeObj.name}</Col>
              <Col xs={3}>₪{placeObj.rate.total}</Col>
              <Col xs={1}>
                <button
                  style={{ display: 'contents' }}
                  onClick={() => handleRemoveItem(placeObj.item_id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="icon" />
                </button>
              </Col>
              <hr />
            </Row>
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
