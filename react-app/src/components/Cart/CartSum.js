import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

function CartSum({ totalPrice }) {
  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>סיכום הזמנה</h3>
      <Row>
        <Col xs={6}>
          <p>סה"כ</p>
        </Col>
        <Col xs={6} style={{ textAlign: 'left' }}>
          {totalPrice === 'loading price' ? (
            <div className="spinner">
              <Spinner animation="border" />
            </div>
          ) : (
            <p>₪{totalPrice}</p>
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
    </div>
  );
}

export default CartSum;
