import { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import './Cart.css';
import useBookingApi from '../../../utils/useSessionApi';
import { Spinner } from 'react-bootstrap';
import '../../UI/CustomButton.css';
import CartCard from './CartCard';
import CartSum from './CartSum';

function Cart() {
  const {
    sessionPlace,
    handlePlaceClick,
    activePlaceIds,
    isLoading,
    totalPrice,
  } = useBookingApi();

  // Add a new localTotalPrice state variable
  const [priceIsLoading, setPriceIsLoading] = useState(false);

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
    <Container className="cart-wrapper">
      {activePlaceIds.length < 1 ? (
        emptyCart
      ) : (
        <Row>
          <Col md={8}>
            <h1>עכשיו בסל שלך</h1>
            {sessionPlace.map((placeObj) => (
              <CartCard
                key={placeObj.item_id}
                placeObj={placeObj}
                handleXButtonClick={handleXButtonClick}
              />
            ))}
          </Col>
          <Col md={4}>
            <CartSum
              totalPrice={totalPrice}
              priceIsLoading={priceIsLoading}
              setPriceIsLoading={setPriceIsLoading}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Cart;
