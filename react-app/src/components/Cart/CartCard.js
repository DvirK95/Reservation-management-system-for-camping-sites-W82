import { Row, Col, Image } from 'react-bootstrap';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { removeItemFromCart } from '../../store/cart-actions';

function CartCard({ placeObj }) {
  const dispatch = useDispatch();
  const xCircleIcon = (
    <FontAwesomeIcon className="icon" icon={faCircleXmark} size="xl" />
  );
  const squareCheck = <FontAwesomeIcon icon={faSquareCheck} />;

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <Row key={placeObj.item_id} className="Card">
      <Col md={4} className="mx-auto text-center">
        {<Image src={placeObj.image[1].url_medium} rounded />}
      </Col>
      <Col md={6}>
        <h5 id="title">{placeObj.name}</h5>
        <p className="par-light">
          {placeObj.startDate} - {placeObj.endDate}
        </p>
        <div dangerouslySetInnerHTML={{ __html: placeObj.summary }}></div>
      </Col>
      <Col md={2}>
        <Row className="justify-content-md-center">
          <Col
            md={{ span: '12', order: 'first' }}
            sm={{ span: '4', order: 'last' }}
            xs={{ span: '4', order: 'last' }}
            className="remove-item"
          >
            <button
              className="x-button"
              onClick={() => {
                handleRemoveItem(placeObj.item_id);
              }}
            >
              {xCircleIcon}
            </button>
          </Col>
          <Col md={12} sm={4}>
            <p id="availability">
              {'נותרו '}
              {placeObj.available}
              {' מקומות '}
              {squareCheck}
            </p>
          </Col>
          <Col md={12} sm={4} className="price">
            <div className="bubble">₪{placeObj.rate.total}</div>
            <p>סה"כ</p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default CartCard;
