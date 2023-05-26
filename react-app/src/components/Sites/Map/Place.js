import './Place.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Col, Row } from 'react-bootstrap';
import { translateErrorStatus } from '../../../utils/hebrew';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { addItemCart } from '../../../store/cart-actions';
import { cartActions } from '../../../store/cart-slice';

function Place({ placeObj, onClick, active }) {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItemCart(item.id, item.slip));
    dispatch(cartActions.showCart(true));
  };

  const placeClassNames = [
    'place',
    placeObj.status !== 'AVAILABLE' ? 'unavailable' : '',
    placeObj.shape,
    active ? 'active' : '',
  ]
    .join(' ')
    .trim();

  const popover = (props) => (
    <Popover id={`tooltip-${placeObj.id}`} {...props}>
      <Popover.Body>
        <Row>
          <Col className="col" sm={7}>
            <h6 style={{ color: placeObj.available === 0 ? 'red' : '' }}>
              &rlm; {placeObj.available}
              {` מקומות פנויים`}
            </h6>
            <p>
              &rlm;{placeObj.price.title}
              {/*` ללילה`*/}
            </p>
          </Col>
          <Col className="col" sm={5}>
            <img src={placeObj.smallImg} alt="small" />
          </Col>
        </Row>
        {placeObj.error ? (
          <span className="error-status">
            {translateErrorStatus(placeObj.error.title)}
          </span>
        ) : (
          <div style={{ margin: 'auto', width: '50%' }}>
            <button style={{ display: 'contents' }}>
              <FontAwesomeIcon
                className="add-cart"
                icon={faCartPlus}
                size="2xl"
                onClick={() =>
                  handleAddItem({
                    id: placeObj._id,
                    slip: placeObj.slip,
                  })
                }
              />
            </button>
          </div>
        )}
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      placement={placeObj.label === 'חושות' ? 'top' : 'auto'}
      overlay={popover}
      trigger="click"
      rootClose
    >
      <span
        style={{
          top: `${placeObj.top}%`,
          left: `${placeObj.left}%`,
        }}
        className={placeClassNames}
      >
        {placeObj.name}
      </span>
    </OverlayTrigger>
  );
}

export default Place;
