import { Row, Col } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CartSum({
  totalPrice,
  priceIsLoading,
  setPriceIsLoading,
  handleCustomButtonClick,
}) {
  const [localTotalPrice, setLocalTotalPrice] = useState(totalPrice);

  // Add a useEffect hook to listen for changes in the sessionPlace array
  useEffect(() => {
    setLocalTotalPrice(totalPrice);
    setPriceIsLoading(false); // Set priceIsLoading to false when localTotalPrice is updated
  }, [totalPrice, setPriceIsLoading]);

  return (
    <>
      <h3 style={{ textAlign: 'center' }}>סיכום הזמנה</h3>
      <Row>
        <Col xs={6}>
          <p>סה"כ</p>
        </Col>
        <Col xs={6} style={{ textAlign: 'left' }}>
          {priceIsLoading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading price...</span>
            </Spinner>
          ) : (
            <p>₪{localTotalPrice}</p>
          )}
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <br />
          <Link to="/checkout" className="custom-button">
            להשלמת ההזמנה ולתשלום
          </Link>
        </Col>
      </Row>
    </>
  );
}

export default CartSum;
