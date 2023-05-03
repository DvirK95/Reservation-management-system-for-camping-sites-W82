import { useState } from 'react';
import { Container, Col, Row, Accordion } from 'react-bootstrap';

import useBookingApi from '../../../utils/bookingApi';
import { Spinner } from 'react-bootstrap';
import '../../UI/CustomButton.css';
import CartForm from './CartForm';
import CartCard from './CartCard';
import CartSum from './CartSum';

import './Cart.css';

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
  const [accordionOpen, setAccordionOpen] = useState(false);

  const handleCustomButtonClick = () => {
    setAccordionOpen(true);
  };

  const handleXButtonClick = (placeObj) => {
    setPriceIsLoading(true);
    handlePlaceClick(placeObj);
  };

  if (activePlaceIds.length < 1) {
    return (
      <Container className="cart-wrapper">
        {isLoading && (
          <div className="spinner-container">
            <Spinner animation="border" />
          </div>
        )}
        {!isLoading && <h1>הסל ריק</h1>}
      </Container>
    );
  } else {
    return (
      <Container className="cart-wrapper">
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
            <Row>
              <Accordion activeKey={accordionOpen ? '0' : null}>
                <Accordion.Item eventKey="0">
                  <Accordion.Body>
                    <h2>כתובת לחיוב</h2>
                    {/*זה משפיע על הרוחב של הטופס*/}
                    <Col md={6}>
                      <CartForm />
                    </Col>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Row>
          </Col>
          <Col md={4}>
            <CartSum
              totalPrice={totalPrice}
              priceIsLoading={priceIsLoading}
              setPriceIsLoading={setPriceIsLoading}
              handleCustomButtonClick={handleCustomButtonClick}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Cart;
