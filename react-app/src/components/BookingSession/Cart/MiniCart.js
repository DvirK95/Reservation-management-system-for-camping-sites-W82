import { useState } from 'react';
import { Row, Col, ListGroup, Image } from 'react-bootstrap';
import './Cart.css';
import useBookingApi from '../../../utils/useSessionApi';
import { Spinner } from 'react-bootstrap';
import '../../UI/CustomButton.css';
import './MiniCart.css';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function MiniCart() {
  const {
    sessionPlace,
    handlePlaceClick,
    activePlaceIds,
    isLoading,
    totalPrice,
  } = useBookingApi();

  // Add a new localTotalPrice state variable
  const [priceIsLoading, setPriceIsLoading] = useState(false);
  const [boxOption, setBoxOption] = useState({
    isOpen: true,
  });

  const handleMouseEnter = () => {
    setBoxOption((prevBoxOption) => ({
      ...prevBoxOption,
      isOpen: true,
    }));
  };

  const handleMouseLeave = () => {
    setBoxOption((prevBoxOption) => ({
      ...prevBoxOption,
      isOpen: false,
    }));
  };

  const handleXButtonClick = (placeObj) => {
    setPriceIsLoading(true);
    handlePlaceClick(placeObj);
  };

  const emptyCart = (
    <>
      {isLoading && (
        <div className="spinner-container">
          <Spinner animation="border" />
        </div>
      )}
      {!isLoading && <h1>הסל ריק</h1>}
    </>
  );

  return (
    <div
      className={`cart-box ${boxOption.isOpen ? 'open' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ListGroup variant="flush">
        <ListGroup.Item>
          <button className="close-button" onClick={handleMouseLeave}>
            X
          </button>
          <h5 id="box-title">סל הקניות שלי </h5>
        </ListGroup.Item>

        {activePlaceIds.length < 1 ? (
          emptyCart
        ) : (
          <>
            {sessionPlace.map((placeObj) => (
              <div
                key={placeObj.item_id}
                //placeObj={placeObj}
                //handleXButtonClick={handleXButtonClick}
              >
                <ListGroup.Item>
                  <Row>
                    <span className="date">
                      {placeObj.startDate} - {placeObj.endDate}
                    </span>
                  </Row>
                  <Row>
                    <Col xxl={5}>
                      <Image src={placeObj.image['1'].url_small} rounded />
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
                        onClick={handleXButtonClick}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} className="icon" />
                      </button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </div>
            ))}
          </>
        )}
        <ListGroup.Item>
          <Row>
            <Col>סה"כ:</Col>
            {!priceIsLoading && <Col dir="ltr">₪{totalPrice}</Col>}
          </Row>
          <Row>
            <Link to="/checkout" className="custom-button">
              המשך לתשלום
            </Link>
            <Link to="/cart" className="custom-button-inverse">
              לסל הקניות
            </Link>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default MiniCart;
